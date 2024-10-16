const { Admin } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const password_hash = await bcrypt.hash(password, 10);
        const admin = await Admin.create({ username, password_hash, role: 'admin' });
        res.status(201).json({ success: true, admin, redirectUrl: './admin.html' }); // Include success field and redirect URL
    } catch (error) {
        console.error('Error during admin registration:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ where: { username } });
        if (!admin || !await bcrypt.compare(password, admin.password_hash)) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token, redirectUrl: './admin.html' }); // Include success field and redirect URL
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};