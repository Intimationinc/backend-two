import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.resolve('calculator.proto');

// Load the proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const calculatorProto = grpc.loadPackageDefinition(packageDefinition).calculator;  // Reference the package

// Implement the add method
function add(call, callback) {
  const { a, b } = call.request;
  const result = a + b;
  callback(null, { result });
}

// Start the gRPC server
function startServer() {
  const server = new grpc.Server();
  server.addService(calculatorProto.Calculator.service, { Add: add });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      console.error(`Server binding error: ${error.message}`);
      return;
    }
    console.log(`gRPC Server running on port ${port}`);
    // No need to call server.start(), bindAsync automatically starts the server.
  });
}

startServer();
