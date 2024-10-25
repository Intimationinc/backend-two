const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");


// Load the protobuf
const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "./registretion.proto"),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition).auth;


// Implement the Resgister RPC method 
const Register = (call, callback) => {
  const userDate = call.request;
  console.log(userDate);

  callback(null, {
    status: 201,
    code: "Created succesfully",
    message: "User Created succesfully",
  });
};



// Start the server and add the service
const main = () => {
  const server = new grpc.Server();

  server.addService(protoDescriptor.Auth.service, { Register });

  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("grpc servers is running");
    }
  );
};

main();
