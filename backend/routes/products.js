// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add a new product
router.post('/', async (req, res) => {
	const { name, description, price, imageUrl, category } = req.body;

	try {
		const newProduct = new Product({ name, description, price, imageUrl, category });
		await newProduct.save();
		res.status(201).json(newProduct);
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

// Get all products
router.get('/', async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) return res.status(404).json({ error: 'Product not found' });
		res.json(product);
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

// Update a product by ID
router.put('/:id', async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!product) return res.status(404).json({ error: 'Product not found' });
		res.json(product);
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);
		if (!product) return res.status(404).json({ error: 'Product not found' });
		res.json({ message: 'Product deleted' });
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

module.exports = router;
