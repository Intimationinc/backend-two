# gRPC Service

================

A simple gRPC service built with Node.js and the `@grpc/grpc-js` library.

## Table of Contents

---

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)

## Getting Started

---

This repository contains a simple gRPC service that allows you to create, read, update, and delete products.

## Prerequisites

---

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Running the Application

---

To run the application, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/grpc-service.git
```

2. Install the dependencies:

```bash
npm install
```

3. Start the server:

```bash
node server.js
```

The server will start listening on port 5051.

## API Endpoints

---

The following API endpoints are available:

- `CreateProduct`: Create a new product
- `ReadProduct`: Read a product by ID
- `ReadProducts`: Read all products
- `UpdateProduct`: Update a product
- `DeleteProduct`: Delete a product

You can use a gRPC client to interact with these endpoints. For example, you can use the `grpc` command-line tool to create a new product:

```bash
grpc call 0.0.0.0:5051 CreateProduct '{"name": "Apple iPhone 13", "description": "A high-end smartphone with advanced features", "price": 999.99}'
```

Note: Replace `0.0.0.0:5051` with the actual address and port of your server.

That's it! You can now use the gRPC service to manage products.
