const mongoose = require('mongoose');

// Define the Category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// Create a Mongoose model for the Category
const Category = mongoose.model('Category', categorySchema);

// Define the Product schema with a reference to Category
const productSchema = new mongoose.Schema({
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
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

async function createProduct(name, price, quantity, categoryId) {
    try {
      const newProduct = new Product({
        name,
        price,
        quantity,
        category: categoryId
      });
  
      // Save the new product to MongoDB
      const savedProduct = await newProduct.save();
  
      return savedProduct;
    } catch (error) {
      throw error;
    }
  }

// Create a Mongoose model for the Product
const Product = mongoose.model('Product', productSchema);

module.exports = {
  Product,
  Category,
  createProduct
};
