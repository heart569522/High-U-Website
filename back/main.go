package main

import (
	"fmt"
	"net/http"

	"github.com/rs/cors"
)

func handleHello(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello, HEARTTT"))
}

func main() {
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000", "http://localhost:3001"},
	})

	handler := http.HandlerFunc(handleHello)
	http.Handle("/api/hello", c.Handler(handler))

	go connect()

	fmt.Println("Listening on http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println(err)
	}
}
