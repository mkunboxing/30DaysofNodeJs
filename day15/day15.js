const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const middleware = require("./logginMiddleware.js");
app.use(bodyParser.json());

app.use(middleware);

app.get("/", (req, res) => {
  res.send("logging middleware is working!");
});

app.post("/", (req, res) => {
    const name = req.body.name
    res.send(`Hello ${name}`)
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

