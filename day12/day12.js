const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

const rateLimiterMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5 // limit each IP to 100 requests per windowMs
    // message: 'Too many requests from this IP, please try again after an hour'
    // header: true
});

app.use(rateLimiterMiddleware);

app.get('/limited', (req, res) => {
    res.send('You are not being rate limited');
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

