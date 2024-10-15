const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './add_service.proto';

// Load the protobuf definition
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

// Get the AddService (might need to dig one level deeper depending on the proto structure)
const addService = protoDescriptor.AddService || protoDescriptor.add_service.AddService; // Check this

// Implement the Add method
function add(call, callback) {
  const num1 = call.request.num1;
  const num2 = call.request.num2;
  const result = num1 + num2;
  callback(null, { result: result });
}

// Start the gRPC server
function main() {
  const server = new grpc.Server();
  
  // Register the Add service and method
  server.addService(addService.service, { Add: add });
  
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Server running at http://0.0.0.0:50051');
    server.start();
  });
}

main();
