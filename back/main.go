package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/rs/cors"

	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func connect() {
	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb+srv://high_u:1234@cluster0.8rriamb.mongodb.net/?retryWrites=true&w=majority"))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.TODO())

	// Check the connection
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB!")
}

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
