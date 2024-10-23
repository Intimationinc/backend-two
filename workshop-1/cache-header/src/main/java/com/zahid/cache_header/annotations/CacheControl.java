package com.zahid.cache_header.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author Md. Zahid Hasan Jamil
 * @project cache-header
 * @created 18/10/2024
 * @copyright © 2024 Md. Zahid Hasan Jamil. All rights reserved.
 * Licensed under the MIT License. See https://opensource.org/licenses/MIT
 */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface CacheControl {
    String value();
}
