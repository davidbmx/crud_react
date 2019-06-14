const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number },
  price: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductsSchema);
