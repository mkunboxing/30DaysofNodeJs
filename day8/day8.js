const express = require('express');
const app = express();

function positiveIntegerHandler(req, res, next) {
  const number = parseInt(req.query.number);

  if (isNaN(number) || number <= 0 || !Number.isInteger(number)) {
    res.status(400).send('Error: The query parameter number must be a positive integer');
  } else {
    res.send('This is a positive integer');
  }
}

app.get('/positive', positiveIntegerHandler);
const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
