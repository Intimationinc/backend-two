const express = require('express');
const app = express();

// const cacheMiddleware = (req, res, next) => {
//     res.set('Cache-Control', 'private, max-age=3600'); // Cache privately for 1 hour
//     next();
// };

const cacheMiddleware = (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    next();
};

app.use('/api/cached-data', cacheMiddleware, (req, res) => {
    res.json({ message: 'This data is cached' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});