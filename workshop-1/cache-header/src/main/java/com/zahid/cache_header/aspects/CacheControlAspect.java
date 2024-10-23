package com.zahid.cache_header.aspects;

import com.zahid.cache_header.annotations.CacheControl;
import jakarta.servlet.http.HttpServletResponse;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

/**
 * @author Md. Zahid Hasan Jamil
 * @project cache-header
 * @created 18/10/2024
 * @copyright © 2024 Md. Zahid Hasan Jamil. All rights reserved.
 * Licensed under the MIT License. See https://opensource.org/licenses/MIT
 */
@Aspect
@Component
public class CacheControlAspect {

    private final HttpServletResponse response;

    public CacheControlAspect(HttpServletResponse response) {
        this.response = response;
    }

    @Before("@annotation(cacheControl)")
    public void applyCacheControl(JoinPoint joinPoint, CacheControl cacheControl) {
        String cacheHeaderValue = cacheControl.value();
        response.setHeader("Cache-Control", cacheHeaderValue);
    }
}