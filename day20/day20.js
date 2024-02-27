const express = require("express");
const mongoose = require("mongoose");

const app = express();

function connectToMongoDB() {
  mongoose
    .connect(
      "mongodb.net/?retryWrites=true&w=majority"
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


  async function averageAgeOfUsers(req, res) {
    try {
        const result = await User.aggregate([
          {
            $group: {
              _id: null,
              averageAge: { $avg: '$age' },
            },
          },
        ]);
    
        if (result.length === 0) {
          res.status(404).json({ error: 'No users found' });
        } else {
          res.json({ averageAge: result[0].averageAge });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }
  app.get('/averageAge', averageAgeOfUsers);
  
  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
  