const mongoose = require('mongoose');

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
  }
});
const Product = mongoose.model('Product', productSchema);

async function createProduct(name, price, quantity) {
  try {
    const newProduct = new Product({
      name,
      price,
      quantity
    });

    // Save the new product to MongoDB
    const savedProduct = await newProduct.save();

    return savedProduct;
  } catch (error) {
    throw error;
  }
}
async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw error;
  }
}
async function updateProduct(productId, updateData) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    return updatedProduct;
  } catch (error) {
    throw error;
  }
}
async function deleteProduct(productId) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return deletedProduct;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  Product,
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
};
