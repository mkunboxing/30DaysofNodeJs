  const mongoose = require('mongoose');
  const express = require('express');

//   const Product  = require('../day24/schema');

  const app = express();

  function connectToMongoDB() {
    mongoose
      .connect(
        "monajority"
      )
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
      });
  }
  connectToMongoDB();

  const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  });
  
  const Product = mongoose.model("Product", productSchema);
  
  function createProductNameIndex() {
    Product.collection.createIndex({ name: 1 }, (err, result) => {
        if (err) {
            console.log(err);
            return err;
        }
        console.log(`Index created successfully`, result);
    })
}
createProductNameIndex();

  app.listen(8000, () => {
    console.log('Server is running...');
  });