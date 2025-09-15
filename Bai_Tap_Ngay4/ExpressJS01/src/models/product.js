const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  description: { type: String },
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
