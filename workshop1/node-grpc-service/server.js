const gRPC = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('product.proto', {});
const gRPCObject = gRPC.loadPackageDefinition(packageDef);

const productPkg = gRPCObject.product;
const products = [];

function createProduct(call, callback) {
  const data = call.request;
  const newProductData = { ...data, id: products.length + 1 };

  products.push(newProductData);
  return callback(null, newProductData);
}

function readProduct(call, callback) {
  const productId = call.request.id;
  const selectedProduct = products.find((product) => product.id === productId);

  if (selectedProduct) {
    return callback(null, selectedProduct);
  } else {
    callback({ code: gRPC.status.NOT_FOUND, details: 'Product not found' });
  }
}
function readProducts(call, callback) {
  return callback(null, { products });
}
function updateProduct(call, callback) {
  const productInfo = call.request;

  const productIdx = products.findIndex(
    (product) => product.id === productInfo.id,
  );

  if (!productIdx) {
    return callback({
      code: gRPC.status.NOT_FOUND,
      details: 'Product not found',
    });
  }

  const selectedProduct = products[productIdx];
  const updatedProduct = {
    ...selectedProduct,
    ...productInfo,
  };

  products.splice(productIdx, 1, updatedProduct);
  return callback(null, updatedProduct);
}

function deleteProduct(call, callback) {
  const productId = call.request.id;

  const productIdx = products.findIndex((product) => product.id === productId);

  if (!productIdx) {
    return callback({
      code: gRPC.status.NOT_FOUND,
      details: 'Product not found',
    });
  }

  products.splice(productIdx, 1);
  return callback(null, { deleted: true });
}

const server = new gRPC.Server();

server.addService(productPkg.Product.service, {
  createProduct,
  readProduct,
  readProducts,
  updateProduct,
  deleteProduct,
});

server.bindAsync(
  '0.0.0.0:5051',
  gRPC.ServerCredentials.createInsecure(),
  () => {
    console.log('Running on 0.0.0.0:5051');
  },
);
