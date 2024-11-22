package com.zahidhasanjamil.websocket.handlers;

import org.apache.logging.log4j.Logger;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


public class PrivateChatWebSocketHandler extends TextWebSocketHandler {

    // Store private sessions, mapping usernames to their sessions
    private final Map<String, WebSocketSession> privateSessions = new ConcurrentHashMap<>();
    private static final Logger logger = org.apache.logging.log4j.LogManager.getLogger(PrivateChatWebSocketHandler.class);

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String username = authenticateUser(session); // Replace with actual authentication logic

        if (username != null) {
            privateSessions.put(username, session);
            session.getAttributes().put("username", username); // Set username attribute
            session.sendMessage(new TextMessage("Welcome, " + username + "! You are now in private chat."));
            logger.info("User {} connected.", username);
        }
        else {
            // If username is not present, close the session
            session.close(CloseStatus.BAD_DATA);
            logger.info("Connection closed due to missing username.");
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String username = (String) session.getAttributes().get("username");

        if (username != null) {
            privateSessions.remove(username);
            logger.info("User {} disconnected.", username);
        }
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String msg = (String) message.getPayload();

        // Split the message into recipient and actual message
        String[] parts = msg.split(":", 2);
        if (parts.length != 2) {
            session.sendMessage(new TextMessage("Invalid message format. Use 'recipient:message' format."));
            logger.info("Invalid message format from user.");
            return; // Ignore invalid messages
        }

        String recipient = parts[0].trim();
        String privateMessage = parts[1].trim();

        // Check if the recipient is connected
        WebSocketSession recipientSession = privateSessions.get(recipient);
        if (recipientSession != null) {
            try {
                recipientSession.sendMessage(new TextMessage("Private message from " + (String) session.getAttributes().get("username") + ": " + privateMessage));
                logger.info("Sent message from {} to {}: {}", (String) session.getAttributes().get("username"), recipient, privateMessage);
            } catch (IOException e) {
                logger.error("Error sending message to recipient {}", recipient, e);
            }
        }
        else {
            session.sendMessage(new TextMessage("User " + recipient + " is not connected."));
            logger.info("Attempted to send message to disconnected user: {}", recipient);
        }
    }

    // Dummy method for authenticating a user (replace with real authentication)
    private String authenticateUser(WebSocketSession session) {
        // Get the username from the session attributes
        String username = (String) session.getAttributes().get("username");

        // If the username is not present, try to get it from the query parameters
        if (username == null) {
            String queryString = session.getUri().getQuery();
            if (queryString != null) {
                String[] params = queryString.split("&");
                for (String param : params) {
                    String[] keyValue = param.split("=");
                    if (keyValue.length == 2 && keyValue[0].equals("username")) {
                        username = keyValue[1];
                        break;
                    }
                }
            }
        }

        // If the username is still not present, return null
        if (username == null) {
            return null;
        }

        // Otherwise, return the username
        return username;
    }
}