package middlewares

import "github.com/gin-gonic/gin"

// Pubic cache is used for caching css, images, files. Both browsers and intermediary caches (like CDNs) can store the response.
func PublicCacheControl() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Cache-Control", "public, max-age=3600")
		c.Next()
	}
}

// Private caching. Only browsers can store the response.
func PrivateCacheControl() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Cache-Control", "private, max-age=60, no-cache, must-revalidate")
		c.Next()
	}
}

// Won't allow browser or any CDN to cache.
func NoStoreCache() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Cache-Control", "no-store")
		c.Next()
	}
}
