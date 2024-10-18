import grpc
import add_service_pb2
import add_service_pb2_grpc

def run():
    # Create a channel to connect to the server
    with grpc.insecure_channel('localhost:50051') as channel:
        # Create a stub (client)
        stub = add_service_pb2_grpc.AddServiceStub(channel)
        
        # Create the request with the two numbers
        request = add_service_pb2.AddRequest(num1=5, num2=3)
        
        # Call the Add method
        response = stub.Add(request)
        
        print(f"Sum of 5 and 3 is: {response.result}")

if __name__ == '__main__':
    run()
