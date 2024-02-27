const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const app = express();

function connectToMongoDB() {
  mongoose
    .connect(
      "mongoDB url",
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
const user = [
  {
    username: "mukul",
    email: "mk@gmail.com",
  },
  {
    username: "mukul1",
    email: "mk1@gmail.com",
  },
  {
    username: "mukul2",
    email: "mk2@gmail.com",
  },
];
user.forEach((user) => {
  addUserToDatabase(user);
});
async function  getAllUsers(req, res) {
  const users =  await User.find({});
  return res.json({data : users});
  }
app.get("/users", getAllUsers);


app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
