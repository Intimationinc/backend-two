package com.zahid.cache_header.controllers;

import com.zahid.cache_header.annotations.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Md. Zahid Hasan Jamil
 * @project cache-header
 * @created 18/10/2024
 * @copyright © 2024 Md. Zahid Hasan Jamil. All rights reserved.
 * Licensed under the MIT License. See https://opensource.org/licenses/MIT
 */
@RestController
@RequestMapping("/api")
public class CacheController {

    @GetMapping("/public-resource")
    @CacheControl("public, max-age=3600")
    public ResponseEntity<String> getPublicResource() {
        String resource = "This is a public resource";
        return new ResponseEntity<>(resource, HttpStatus.OK);
    }

    @GetMapping("/private-resource")
    @CacheControl("private, max-age=1800")
    public ResponseEntity<String> getPrivateResource() {
        String resource = "This is a private resource";
        return new ResponseEntity<>(resource, HttpStatus.OK);
    }
}