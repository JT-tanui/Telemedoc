const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authMiddleware = require('../middleware/authMiddleware');

// Define patient routes here
router.post('/register', patientController.register);
router.post('/login', patientController.login);
router.get('/', authMiddleware, patientController.getAllPatients);
router.put('/:id', authMiddleware, patientController.updatePatient);
router.delete('/:id', authMiddleware, patientController.deletePatient);

module.exports = router;