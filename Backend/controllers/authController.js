const { Admin, Patient, Doctor } = require('../models'); // Import models from index.js
const doctorController = require('./doctorController');
const patientController = require('./patientController');
const adminController = require('./adminController');

// Registration logic
exports.register = async (req, res) => {
    console.log('Signup request received:', req.body);
    try {
        const { first_name, last_name, email, password, role, phone, date_of_birth, gender, address, specialization, schedule, username } = req.body;
        
        // Validate required fields
        if (!first_name || !last_name || !email || !password || !role) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if the email already exists
        let existingUser;
        if (role === 'admin') {
            existingUser = await Admin.findOne({ where: { email } });
        } else if (role === 'doctor') {
            existingUser = await Doctor.findOne({ where: { email } });
        } else {
            existingUser = await Patient.findOne({ where: { email } });
        }

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
 
        // Delegate to respective controller
        if (role === 'admin') {
            return adminController.register(req, res);
        } else if (role === 'doctor') {
            return doctorController.register(req, res);
        } else {
            return patientController.register(req, res);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Login logic
exports.login = async (req, res) => {
    console.log('Login request received:', req.body);
    try {
        const { email, password, role } = req.body;

        // Validate required fields
        if (!email || !password || !role) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Delegate to respective controller
        if (role === 'admin') {
            return adminController.login(req, res);
        } else if (role === 'doctor') {
            return doctorController.login(req, res);
        } else {
            return patientController.login(req, res);
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};