// routes/products.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const { adminMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();
const Product = require('../models/Product');

// Add a new product (Admin only)
router.post('/', [
	adminMiddleware,
	check('name').notEmpty().withMessage('Name is required'),
	check('price').isNumeric().withMessage('Price must be a number'),
	check('description').notEmpty().withMessage('Description is required'),
	check('category').isIn(['Snacks', 'Drinks', 'Light Meals', 'Desserts']).withMessage('Category must be one of: Snacks, Drinks, Light Meals, Desserts')], 
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, description, price, imageUrl, category } = req.body;

		try {
			const newProduct = new Product({ name, description, price, imageUrl, category });
			await newProduct.save();
			res.status(201).json(newProduct);
		} catch (err) {
			res.status(500).json({ error: 'Server error' });
		}
	}
);

// Get products with optional category filter
router.get('/', async (req, res) => {
	const { category, search, page = 1, limit = 8 } = req.query;
	const filter = {};

	// Filter by category if provided
	if (category) {
		filter.category = category;
	}

	// Case-insensitive search for product name if provided
	if (search) {
		filter.name = { $regex: search, $options: 'i' };
	}

	try {
		const products = await Product.find(filter).skip((page - 1) * limit).limit(Number(limit));

		const totalProducts = await Product.countDocuments(filter);

		res.json({
			products,
			totalPages: Math.ceil(totalProducts / limit),  // Calculate total pages
			currentPage: Number(page),  // Return the current page number
		});
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

// Update a product by ID (Admin only)
router.put('/:id', adminMiddleware, async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!product) return res.status(404).json({ error: 'Product not found' });
		res.json(product);
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

// Delete a product by ID (Admin only)
router.delete('/:id', adminMiddleware, async (req, res) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);
		if (!product) return res.status(404).json({ error: 'Product not found' });
		res.json({ message: 'Product deleted' });
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

module.exports = router;
