const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const app = express();

function connectToMongoDB() {
  mongoose
    .connect(
      "mongodb+srv://mukuldb:xmCnlDhg1KkEb8VE@mongodb.56ivgwq.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}
connectToMongoDB();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

function addUserToDatabase(user) {
  const newuser = new User(user);
    newuser.save()
    .then(() => {
      console.log("User added to database");
    })
    .catch((error) => {
        console.log(error);
    });
}

const user = {
  username: "mukul",
  email: "mk@gmail.com",
};

addUserToDatabase(user);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
