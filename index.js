import express from 'express';
import cacheControlMiddleware from './cacheControlMiddleware.js';
const app = express();

// Apply cache middleware for public caching (e.g., for static assets)
app.use('/static', cacheControlMiddleware({ cacheType: 'public', maxAge: 86400 }));  // 1 day

// Apply cache middleware for private caching (e.g., for user-specific data)
app.use('/user/profile', cacheControlMiddleware({ cacheType: 'private', maxAge: 300 }));  // 5 minutes

// Route without cache control
app.get('/no-cache', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.send('This route will not be cached.');
});

// Sample route
app.get('/static', (req, res) => {
  res.send('This is a static route with caching.');
});

app.get('/user/profile', (req, res) => {
  res.send('This is a user-specific route with caching.');
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

