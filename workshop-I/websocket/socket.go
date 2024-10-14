package websocket

import (
	"fmt"
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var clients = make(map[*websocket.Conn]bool) // active WebSocket clients
var broadcast = make(chan Message)           // channel to broadcast messages
var mu sync.Mutex

type Message struct {
	Username string `json:"username"`
	Content  string `json:"content"`
}

// Handle public WebSocket channel (chat-room)
func HandlePublicChannel(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		fmt.Println("Failed to upgrade connection:", err)
		return
	}
	defer conn.Close()

	mu.Lock()
	clients[conn] = true // Add the client to the active clients
	mu.Unlock()

	// Read messages from WebSocket connection
	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			fmt.Println("Error reading message:", err)
			break
		}

		// Broadcast message to other clients
		var message Message
		message.Username = "Guest"
		message.Content = string(msg)

		broadcast <- message
	}

	// Remove client when the connection is closed
	mu.Lock()
	delete(clients, conn)
	mu.Unlock()
}

// Handle sending messages via REST
func HandleSendMessage(c *gin.Context) {
	var message Message
	if err := c.ShouldBindJSON(&message); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Broadcast the message to WebSocket clients
	broadcast <- message
	c.JSON(http.StatusOK, gin.H{"status": "message sent through /send hub!"})
}

// Broadcast messages to all WebSocket clients
func HandleMessageBroadcast() {
	for {
		msg := <-broadcast

		// Send the message to all active clients
		mu.Lock()
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				fmt.Println("Error sending message:", err)
				client.Close()
				delete(clients, client)
			}
		}
		mu.Unlock()
	}
}
