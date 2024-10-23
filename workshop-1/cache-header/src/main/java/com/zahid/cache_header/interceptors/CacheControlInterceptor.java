package com.zahid.cache_header.interceptors;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * @author Md. Zahid Hasan Jamil
 * @project cache-header
 * @created 18/10/2024
 * @copyright © 2024 Md. Zahid Hasan Jamil. All rights reserved.
 * Licensed under the MIT License. See https://opensource.org/licenses/MIT
 */
@Component
public class CacheControlInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!response.containsHeader("Cache-Control")) {
            // Global fallback: Default no-cache for unspecified routes
            response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        }
        return true;
    }
}