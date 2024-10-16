const { Patient } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;
        const password_hash = await bcrypt.hash(password, 10);
        const patient = await Patient.create({ first_name, last_name, email, password_hash, phone, date_of_birth, gender, address });
        res.status(201).json({ success: true, patient, redirectUrl: './patient.html' }); // Include success field and redirect URL
    } catch (error) {
        console.error('Error during patient registration:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login request received:', { email, password });

        const patient = await Patient.findOne({ where: { email } });
        if (!patient) {
            console.log('User not found');
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, patient.password_hash);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: patient.id, role: 'patient' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token, redirectUrl: './patient.html' }); // Include success field and redirect URL
    } catch (error) {
        console.error('Error during patient login:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, phone, date_of_birth, gender, address } = req.body;
        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        patient.first_name = first_name;
        patient.last_name = last_name;
        patient.email = email;
        patient.phone = phone;
        patient.date_of_birth = date_of_birth;
        patient.gender = gender;
        patient.address = address;
        await patient.save();
        res.json(patient);
    } catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        await patient.destroy();
        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};