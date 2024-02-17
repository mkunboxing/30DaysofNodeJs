const express = require('express');
const mongoose = require('mongoose');

const app = express();

function connectToMongoDB() {
    mongoose.connect('mongodb url here ').then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
  }
connectToMongoDB();
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
})