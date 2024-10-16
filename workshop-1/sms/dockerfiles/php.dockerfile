FROM php:8.2-fpm-alpine

ARG UID
ARG GID

ENV UID=${UID}
ENV GID=${GID}

# Create the application directory
RUN mkdir -p /var/www/html

WORKDIR /var/www/html

# Copy Composer from the latest image
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Remove the MacOS staff group's gid conflict
RUN delgroup dialout

# Create a new group and user with the specified UID and GID
RUN addgroup -g ${GID} --system laravel
RUN adduser -G laravel --system -D -s /bin/sh -u ${UID} laravel

# Update the php-fpm configuration to use the new laravel user and group
RUN sed -i "s/user = www-data/user = laravel/g" /usr/local/etc/php-fpm.d/www.conf
RUN sed -i "s/group = www-data/group = laravel/g" /usr/local/etc/php-fpm.d/www.conf
RUN echo "php_admin_flag[log_errors] = on" >> /usr/local/etc/php-fpm.d/www.conf

# Install dependencies for zip, exif, and PHP extensions (PDO, Redis, GD, and EXIF)
RUN apk add --no-cache \
        libzip-dev zip \
        freetype-dev \
        libpng-dev \
        libjpeg-turbo-dev \
        libwebp-dev \
        libxpm-dev \
    && docker-php-ext-configure zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install pdo pdo_mysql zip gd exif

# Install Redis extension
RUN mkdir -p /usr/src/php/ext/redis \
    && curl -L https://github.com/phpredis/phpredis/archive/5.3.4.tar.gz | tar xvz -C /usr/src/php/ext/redis --strip 1 \
    && echo 'redis' >> /usr/src/php-available-exts \
    && docker-php-ext-install redis

# Enable exif extension
RUN docker-php-ext-enable exif

# Switch to the laravel user
USER laravel

# Set default command for the container
CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]
