const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');

// Define doctor routes here
router.post('/register', doctorController.register);
router.post('/login', doctorController.login);
router.get('/', authMiddleware, doctorController.getAllDoctors);
router.put('/:id', authMiddleware, doctorController.updateDoctor);
router.delete('/:id', authMiddleware, doctorController.deleteDoctor);

module.exports = router;