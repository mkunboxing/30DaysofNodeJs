
const express = require('express');
const app = express();
const port = 8000;

const logRequest = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  console.log(`${timestamp} - ${method} request received`);
  next(); 
};

app.use(logRequest);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
