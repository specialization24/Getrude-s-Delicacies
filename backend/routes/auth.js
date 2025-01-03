// routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
	const { name, email, password, isAdmin } = req.body;

	try {
		// Check if user already exists
		let user = await User.findOne({ email });
		if (user) return res.status(400).json({ message: 'User already exists' });

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create new user
		user = new User({ name, email, password: hashedPassword, isAdmin });
		await user.save();

		res.status(201).json({ message: 'User created successfully' });
	} catch (err) {
		res.status(500).send('Server error');
	}
});

// Login Route
router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		// Check if user exists
		let user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: 'Invalid credentials' });

		// Check password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

		// Create JWT token
		const payload = { id: user.id, name: user.name, isAdmin: user.isAdmin };
		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

		res.json({ token });
	} catch (err) {
		res.status(500).send('Server error');
	}
});

module.exports = router;
