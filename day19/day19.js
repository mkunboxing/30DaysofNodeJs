const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const app = express();

function connectToMongoDB() {
  mongoose
    .connect(
      "mongodb+srv:/ue&w=majority"
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
    validate: {
      validator: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  age:{
    type: Number,
    required: true,
  }
});

const User = mongoose.model("User", userSchema);

function addUserWithValidation(user) {
  const newuser = new User(user);
  newuser
    .save()
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
    age: 19
  },
  {
    username: "mukul1",
    email: "mk1@gmail.com",
    age: 23
  },
  {
    username: "mukul2",
    email: "mk2@gmail.com",
    age: 24
  },
  {
    username: "mukul3",
    email: "mk3@gmail.com",
    age: 26
  }
];
user.forEach((user) => {
  addUserWithValidation(user);
});
async function getAllUsers(req, res) {
  const users = await User.find({});
  return res.json({ data: users });
}
app.get("/users", getAllUsers);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
