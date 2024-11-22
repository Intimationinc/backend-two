package com.zahidhasanjamil.websocket.handlers;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


// Socket-Connection Configuration class
public class SocketConnectionHandler extends TextWebSocketHandler {

    // In this list all the connections will be stored
    // Then it will be used to broadcast the message
    List<WebSocketSession> webSocketSessions
            = Collections.synchronizedList(new ArrayList<>());

    // This method is executed when client tries to connect
    // to the sockets
    @Override
    public void
    afterConnectionEstablished(WebSocketSession session) throws Exception {

        super.afterConnectionEstablished(session);
        // Logging the connection ID with Connected Message
        System.out.println(session.getId() + " Connected");

        // Adding the session into the list
        webSocketSessions.add(session);
    }

    // When client disconnect from WebSocket then this
    // method is called
    @Override
    public void afterConnectionClosed(WebSocketSession session,
                                      CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        System.out.println(session.getId()
                + " DisConnected");

        // Removing the connection info from the list
        webSocketSessions.remove(session);
    }

    // It will handle exchanging of message in the network
    // It will have a session info who is sending the
    // message Also the Message object passes as parameter
    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {

        super.handleMessage(session, message);

        // Iterate through the list and pass the message to
        // all the sessions Ignore the session in the list
        // which wants to send the message.
        for (WebSocketSession webSocketSession :
                webSocketSessions) {
            if (session == webSocketSession)
                continue;

            // sendMessage is used to send the message to
            // the session
            webSocketSession.sendMessage(message);
        }
    }
}