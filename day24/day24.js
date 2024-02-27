const express = require('express');
const mongoose = require('mongoose');

const {createProduct, getAllProducts, updateProduct, deleteProduct } = require('./schema');

function connectToMongoDB() {
    mongoose
      .connect(
        "mongodb+srt/?retryWrites=true&w=majority"
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
    const { name, discription, price } = req.body;
    const newProduct = await createProduct(name, discription, price);
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

app.listen(3000, () => {
  console.log('Server is running...');
});

