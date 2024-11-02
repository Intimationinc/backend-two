const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('Internal server error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/public-picture.jpg') {
    const imgPath = path.join(__dirname, 'public-picture.jpg');
    fs.readFile(imgPath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Image Not Found');
      } else {
        res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=60', // Cache image for 1 day
        });
        res.end(data);
      }
    });
  } else if (req.url === '/private-picture.jpg') {
    const imgPath = path.join(__dirname, 'private-picture.jpg');
    fs.readFile(imgPath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Image Not Found');
      } else {
        res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'private, max-age=60', // Cache image for 1 day
        });
        res.end(data);
      }
    });
  } else if (req.url === '/no-store-cache.jpg') {
    const imgPath = path.join(__dirname, 'no-store-cache.jpg');
    console.log(imgPath);
    fs.readFile(imgPath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Image Not Found');
      } else {
        res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'no-store',
        });
        res.end(data);
      }
    });
  } else if (req.url === '/no-cache-picture.jpg') {
    const imgPath = path.join(__dirname, 'no-cache-picture.jpg');
    console.log(imgPath);
    fs.readFile(imgPath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Image Not Found');
      } else {
        res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'no-cache',
        });
        res.end(data);
      }
    });
  } else if (req.url === '/public-cache') {
    const filePath = path.join(__dirname, 'public-cache.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('Internal server error');
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html',
          'Cache-Control': 'public, max-age=60',
        });
        res.end(data);
      }
    });
  } else if (req.url === '/private-cache') {
    const filePath = path.join(__dirname, 'private-cache.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('Internal server error');
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html',
          'Cache-Control': 'private, max-age=60',
        });
        res.end(data);
      }
    });
  } else if (req.url === '/no-store-cache') {
    const filePath = path.join(__dirname, 'no-store-cache.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('Internal server error');
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-store',
        });
        res.end(data);
      }
    });
  } else if (req.url === '/no-cache') {
    const filePath = path.join(__dirname, 'no-cache.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('Internal server error');
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache',
        });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('Page not found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
