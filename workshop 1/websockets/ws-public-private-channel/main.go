package main

import (
	"fmt"
	"net/http"
	"strings"
	"sync"

	"github.com/gorilla/websocket"
)

/*
WebSocket Upgrader:
The Upgrader plays a crucial role in establishing a WebSocket connection
by transitioning an initial HTTP request into a persistent WebSocket
connection (Full-Duplex Communication), allowing real-time data exchange
between the client and server.
*/
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all connections
	},
}

// Global list of WebSocket connections
var publicConnections = make(map[*websocket.Conn]bool)
var privateConections = make(map[*websocket.Conn]bool)
var connMutex = sync.Mutex{}

// Channel for broadcasting messages
var publicChannel = make(chan []byte)
var privateChannel = make(chan []byte)

// Dummy token for authentication.
// TODO: Here you can use jwt token for authentication
const validToken = "jwtToken123"

func main() {

	// Handle WebSocket connections
	http.HandleFunc("/ws", wsHandler)

	// REST endpoint for broadcasting messages
	http.HandleFunc("/send", sendHandler)

	// Start a goroutine to handle broadcasting
	go handleBroadcast()

	fmt.Println("Server started on :8080")
	http.ListenAndServe(":8080", nil)
}

// WebSocket handler
func wsHandler(w http.ResponseWriter, r *http.Request) {

	// Upgrade the HTTP connection to a WebSocket connection
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Error upgrading to websocket:", err)
		return
	}

	defer conn.Close()

	// Check if this is a request for a private channel
	channelName := r.URL.Query().Get("channel")
	token := r.URL.Query().Get("token")

	if strings.HasPrefix(channelName, "private-") {
		if token != validToken {
			fmt.Println("Invalid token for private channel")
			conn.WriteMessage(websocket.TextMessage, []byte("Unauthorized"))
			return
		}
		// Add the new private conections to the list
		connMutex.Lock()
		privateConections[conn] = true
		connMutex.Unlock()

	} else {
		// Add the new connection to the list
		connMutex.Lock()
		publicConnections[conn] = true
		connMutex.Unlock()
	}

	// Remove the connection when done
	defer func() {
		connMutex.Lock()
		delete(publicConnections, conn)
		delete(privateConections, conn)
		connMutex.Unlock()
	}()

	// Keep the connection alive
	for {
		_, _, err := conn.ReadMessage()
		if err != nil {
			fmt.Println("Error reading message:", err)
			break
		}
	}
}

// REST handler for sending messages
func sendHandler(w http.ResponseWriter, r *http.Request) {
	// Read the message, channel from the request body
	message := r.FormValue("message")
	channelName := r.FormValue("channel")

	if message == "" || channelName == "" {
		http.Error(w, "Message and channel are required", http.StatusBadRequest)
		return
	}

	// Send the message to the appropriate channel
	if strings.HasPrefix(channelName, "private-") {
		privateChannel <- []byte(message)
	} else {
		publicChannel <- []byte(message)
	}

	fmt.Fprintln(w, "Message sent to channel:", channelName)
}

func handleBroadcast() {
	// Infinite loop
	for {
		select {
		// Code to execute when a message is received from publicChannel or privateChannel
		case msg := <-publicChannel:
			broadCastMessage(msg, publicConnections)
		case msg := <-privateChannel:
			broadCastMessage(msg, privateConections)
		}
	}
}

func broadCastMessage(msg []byte, connections map[*websocket.Conn]bool) {
	// Lock the connections list and send the message to each connection
	connMutex.Lock()
	defer connMutex.Unlock()

	for conn := range connections {
		err := conn.WriteMessage(websocket.TextMessage, msg)
		if err != nil {
			fmt.Println("Error broadcasting message:", err)
			conn.Close()
			delete(connections, conn)
		}
	}
}
