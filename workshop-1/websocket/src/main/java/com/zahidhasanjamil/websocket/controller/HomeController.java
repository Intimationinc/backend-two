package com.zahidhasanjamil.websocket.controller;

//Controller layer for testing
// websocket connection


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller class for handling web requests.
 */
@Controller
public class HomeController {
    @GetMapping("/")
    public String index() {
        return "forward:/client.html";
    }
}
