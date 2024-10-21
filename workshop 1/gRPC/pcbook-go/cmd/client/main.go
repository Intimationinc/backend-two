package main

import (
	"context"
	"flag"
	"log"
	"regain001/pcbook-go/pb"
	"regain001/pcbook-go/sample"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func main() {
	serverAddress := flag.String("address", "", "the server address")
	flag.Parse()
	log.Printf("dial server %s", *serverAddress)

	conn, err := grpc.NewClient(*serverAddress, grpc.WithInsecure()) // grpc.WithInsecure() -> insecure connection for now
	if err != nil {
		log.Fatal("cannot dial server: ", err)
	}

	laptopClient := pb.NewLaptopServiceClient(conn)

	laptop := sample.NewLaptop()
	// laptop.Id = "f1444ac6-7710-4c5c-9eda-a2d698b3a4eb"
	// laptop.Id = "invalid"
	req := &pb.CreateLaptopRequest{
		Laptop: laptop,
	}

	// set timeout
	// if request processing time takes more than 5 seconds, it terminates the request from the client side
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	res, err := laptopClient.CreateLaptop(ctx, req)
	if err != nil {
		st, ok := status.FromError(err)
		if ok && st.Code() == codes.AlreadyExists {
			// not a big deal
			log.Print("laptop already exists")
		} else {
			log.Fatal("cannot create laptop: ", err)
		}
		return
	}

	log.Printf("created laptop with id: %s", res.Id)
}
