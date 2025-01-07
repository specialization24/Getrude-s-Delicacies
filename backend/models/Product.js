// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	name: { type: String, required: true, },
	description: { type: String, },
	price: { type: Number, required: true, },
	imageUrl: { type: String, required: true },
	category: { type: String, required: true, enum: ['Snacks', 'Drinks', 'Light Meals', 'Desserts'], },
});

module.exports = mongoose.model('Product', ProductSchema);
