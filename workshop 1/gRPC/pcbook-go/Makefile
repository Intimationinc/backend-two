gen:
	# Generate Go code from all .proto files to this folder [/home/mukbul/projects/go/gRPC/pcbook-go/pb] 
	protoc --proto_path=/home/mukbul/projects/go/gRPC/pcbook-go/proto \
    --go_out=/home/mukbul/projects/go/gRPC/pcbook-go/pb --go_opt=paths=source_relative \
    --go-grpc_out=/home/mukbul/projects/go/gRPC/pcbook-go/pb --go-grpc_opt=paths=source_relative \
    /home/mukbul/projects/go/gRPC/pcbook-go/proto/*.proto

clean:
	# Remove generated Go files
	rm pb/*.go

server:
	# Run the server
	go run cmd/server/main.go -port 8080

client:
	# Run the client
	go run cmd/client/main.go -address 0.0.0.0:8080

test: 
	# Test code coverage and check whether code has any race condition 
	go test -cover -race ./...
