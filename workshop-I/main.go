package main

import (
	"workshop-i/middlewares"
	"workshop-i/websocket"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// =========== cache control part ============

	// Apply public cache middleware (with 3600 seconds max-age)
	r.GET("/public", middlewares.PublicCacheControl(), func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "This is a public resource.",
		})
	})

	// Apply private cache middleware
	r.GET("/private", middlewares.PrivateCacheControl(), func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "This is a private resource.",
		})
	})

	// Apply no-store cache middleware
	r.GET("/no-store", middlewares.NoStoreCache(), func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "This resource should not be cached.",
		})
	})

	// =========== web socket part =============

	// WebSocket endpoint
	r.GET("/ws/chat", websocket.HandlePublicChannel)

	// REST API to send messages
	r.POST("/send", websocket.HandleSendMessage)

	// Start broadcasting messages
	go websocket.HandleMessageBroadcast()

	r.Run(":8080")
}
