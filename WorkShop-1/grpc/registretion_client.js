
// client.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require("path");

// Load the protobuf
const packageDefinition = protoLoader.loadSync(path.resolve(__dirname, "./registretion.proto"), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const registretionProto = grpc.loadPackageDefinition(packageDefinition).auth;



  // Create a client and make a request
function main() {
    const client = new registretionProto.Auth('127.0.0.1:50051', grpc.credentials.createInsecure());
  
    client.Register({ name: 'jafar',email:'admin@gmail.com',password:'1234' }, (error, response) => {
      if (!error) {
        console.log('Registretion:', response);
      } else {
        console.error(error);
      }
    });
  }
  
  main();
