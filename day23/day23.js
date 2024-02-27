const express = require("express");
const mongoose = require("mongoose");
const { Product, Category, createProduct } = require("./model");

function connectToMongoDB() {
  mongoose
    .connect(
      "mongodb+sryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}
connectToMongoDB();

const app = express();
app.use(express.json());

app.post("/products", async (req, res) => {
  try {
    const { name, price, quantity, categoryId } = req.body;
    const categoryExists = await Category.exists({ _id: categoryId });
    if (!categoryExists) {
      return res.status(404).json({ error: "Category not found" });
    }

    const newProduct = await createProduct(name, price, quantity, categoryId);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/categories', async (req, res) => {
    try {
      const { name } = req.body;
  
      const newCategory = new Category({
        name
      });
  
      const savedCategory = await newCategory.save();
  
      res.json(savedCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.get("/products", async (req, res) => {
  try {
  
    const productsWithCategories = await Product.find()
      .populate("category")
      .exec();

    res.json(productsWithCategories);
    console.log(productsWithCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
