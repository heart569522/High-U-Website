package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Task struct {
	ID     int    `bson:"_id"`
	Title  string `bson:"title"`
	Status string `bson:"status"`
}

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

	// Get a handle for your collection
	collection := client.Database("tasks").Collection("tasks")

	// Insert a task
	task := Task{ID: 1, Title: "Learn Go", Status: "In Progress"}
	insertResult, err := collection.InsertOne(context.TODO(), task)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Inserted a task: ", insertResult.InsertedID)

	// Find a task
	var result Task
	filter := bson.D{{Key: "_id", Value: 1}}
	err = collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Found a task: %+v\n", result)

	// Update a task
	update := bson.D{
		{Key: "$set", Value: bson.D{
			{Key: "status", Value: "Completed"},
		}},
	}
	updateResult, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Matched %v documents and updated %v documents.\n", updateResult.MatchedCount, updateResult.ModifiedCount)

	// Delete a task
	deleteResult, err := collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Deleted %v documents.\n", deleteResult.DeletedCount)
}
