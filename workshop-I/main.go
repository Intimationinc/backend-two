package main

import (
	"workshop-i/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

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

	r.Run(":8080")
}
