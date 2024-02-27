const express = require('express');
const mongoose = require('mongoose');
const { Product, createProduct, getAllProducts, updateProduct, deleteProduct } = require('./crudModel');
function connectToMongoDB() {
    mongoose
      .connect(
        "mongodb&w=majority"
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

// Route to create a new product
app.post('/products', async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const newProduct = await createProduct(name, price, quantity);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all products
app.get('/products', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update a product by ID
app.put('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;
    const updatedProduct = await updateProduct(productId, updateData);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a product by ID
app.delete('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await deleteProduct(productId);
    res.send(" deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
