import express from 'express';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.resolve('calculator.proto');
const app = express();

// Load the proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const calculatorProto = grpc.loadPackageDefinition(packageDefinition).calculator;  // Reference the package!

// Create a gRPC client
const client = new calculatorProto.Calculator('localhost:50051', grpc.credentials.createInsecure());  // Correct service reference

app.get('/', (req, res) => {
  res.send(`please use /add/:a/:b for example: /add/1/2`);
})

app.get('/add/:a/:b', (req, res) => {
  const { a, b } = req.params;

  if(typeof a !== 'number' && typeof b !== 'number') {
    return res.status(400).send('Invalid request parameters');
  }

  client.Add({ a: parseInt(a), b: parseInt(b) }, (err, response) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json({ result: response.result });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});
