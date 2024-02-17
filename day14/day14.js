const express = require('express');
const cache = require('memory-cache');

const app = express();
const port = 3000;

// Middleware function for caching
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl || req.url; 
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    
    res.send("cached "+cachedResponse);
    console.log("cached "+cachedResponse);
  } else {
    
    res.sendResponse = res.send;
    res.send = (body) => {
      
      cache.put(key, body, 10 * 1000); 
      res.sendResponse(body);
    };
    next();
  }
};

// Apply the caching middleware to all routes
app.use(cacheMiddleware);

// Your routes go here
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
