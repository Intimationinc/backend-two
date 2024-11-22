package com.zahid.cache_header.config;

import com.zahid.cache_header.interceptors.CacheControlInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author Md. Zahid Hasan Jamil
 * @project cache-header
 * @created 18/10/2024
 * @copyright © 2024 Md. Zahid Hasan Jamil. All rights reserved.
 * Licensed under the MIT License. See https://opensource.org/licenses/MIT
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private CacheControlInterceptor cacheControlInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(cacheControlInterceptor).addPathPatterns("/**");
    }
}
