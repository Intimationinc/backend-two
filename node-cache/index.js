import express from 'express';
import cacheControlMiddleware from './cacheControlMiddleware.js';
const app = express();

// Apply cache middleware for public
app.use('/static', cacheControlMiddleware({ cacheType: 'public', maxAge: 86400 })); 

// Apply cache middleware for private 
app.use('/user', cacheControlMiddleware({ cacheType: 'private', maxAge: 300 })); 

// Route without cache control
app.get('/no-cache', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.send('This route will not be cached.');
});

// Sample route
app.get('/static', (req, res) => {
  res.send('This is a static route with caching.');
});

// Sample route
app.get('/user/profile', (req, res) => {
  res.send('This is a private route with caching.');
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

