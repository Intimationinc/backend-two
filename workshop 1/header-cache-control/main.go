package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {
	// Handler for cached content
	http.HandleFunc("/cached", cachedHandler)

	// Handler for non-cached content
	http.HandleFunc("/non-cached", nonCachedHandler)

	fmt.Println("Server is running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}

// cachedHandler serves a response with Cache-Control headers
func cachedHandler(w http.ResponseWriter, r *http.Request) {
	// Set the Cache-Control header
	// public: The response can be cached by any cache (e.g., browser or CDN).
	// max-age=60: The cached response is valid for 60 seconds. After 60 seconds, the cache is considered stale.
	w.Header().Set("Cache-Control", "public, max-age=60")

	// Send the response
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fmt.Sprintf("This is a cached response. Time: %s", time.Now().Format(time.RFC1123))))
}

// nonCachedHandler serves a response without Cache-Control headers
func nonCachedHandler(w http.ResponseWriter, r *http.Request) {
	// No Cache-Control header is set, so the response is not cached
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fmt.Sprintf("This is not cached. Time: %s", time.Now().Format(time.RFC1123))))
}

/*
	Advanced Cache-Control Settings
	-------------------------------
	no-cache: Forces caches to validate the response with the origin server before using a cached copy.
	no-store: Prevents any caching of the response.
	private: Allows caching by the browser but prevents it from being cached by shared caches like CDNs.
	must-revalidate: Forces revalidation of stale responses before using them.
	s-maxage: Overrides max-age for shared caches (e.g., CDN).
*/
