package com.zahidhasanjamil.websocket.configuration;

import com.zahidhasanjamil.websocket.handlers.PrivateChatWebSocketHandler;
import com.zahidhasanjamil.websocket.handlers.SocketConnectionHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

// This is the configuration class for WebSocket
// connections. It enables WebSocket and registers the
// SocketConnectionHandler class as the handler for the
// "/hello" endpoint. It also sets the allowed origins to
// "*" so that other domains can also access the socket.

// web socket connections is handled by this class
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    // Overriding a method which register the socket
    // handlers into a Registry
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
        // For adding a Handler we give the Handler class we
        // created before with End point Also we are managing
        // the CORS policy for the handlers so that other
        // domains can also access the socket
        webSocketHandlerRegistry
                .addHandler(new SocketConnectionHandler(), "/public-chat")
                .setAllowedOrigins("*");

        // Private chat endpoint with basic auth check
        webSocketHandlerRegistry
                .addHandler(new PrivateChatWebSocketHandler(), "/private-chat")
                .setAllowedOrigins("*");
    }
}
