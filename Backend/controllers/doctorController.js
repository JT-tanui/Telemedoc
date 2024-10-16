const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Doctor } = require('../models');

exports.register = async (req, res) => {
    try {
        const { first_name, last_name, email, password, phone, specialization, schedule } = req.body;
        const password_hash = await bcrypt.hash(password, 10);
        const doctor = await Doctor.create({ first_name, last_name, email, password_hash, phone, specialization, schedule });
        res.status(201).json({ success: true, doctor, redirectUrl: './doctor.html' }); // Include success field and redirect URL
    } catch (error) {
        console.error('Error during doctor registration:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await Doctor.findOne({ where: { email } });
        if (!doctor || !await bcrypt.compare(password, doctor.password_hash)) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: doctor.id, role: 'doctor' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token, redirectUrl: './doctor.html' }); // Include success field and redirect URL
    } catch (error) {
        console.error('Error during doctor login:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, phone, specialization, schedule } = req.body;
        const doctor = await Doctor.findByPk(id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        doctor.first_name = first_name;
        doctor.last_name = last_name;
        doctor.email = email;
        doctor.phone = phone;
        doctor.specialization = specialization;
        doctor.schedule = schedule;
        await doctor.save();
        res.json(doctor);
    } catch (error) {
        console.error('Error updating doctor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findByPk(id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        await doctor.destroy();
        res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};