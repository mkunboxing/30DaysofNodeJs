const express = require('express');
const mongoose = require('mongoose');

const app = express();

function connectToMongoDB() {
    mongoose
      .connect(
        "mongodb+srv://ites=true&w=majority"
      )
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
      });
  }
  connectToMongoDB();

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model("Product", productSchema);

async function getProductStatistics() {
    try {
        const result = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalProducst: { $sum: 1 },
                    avgPrice: { $avg: "$price" },
                    maxQuant: { $max: "$quantity" }
                }
            }
        ]);
        return result;
    } catch (error) {
        console.error(`Error in getProductStatistics: ${error.message}`);
        throw error;
    }
}

app.get("/", async (req, res) => {
    try {
        const statistics = await getProductStatistics();
        console.log(statistics);
        res.json(statistics);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

app.listen(3000, () => {
    console.log('Server is running on 3000');
  });
