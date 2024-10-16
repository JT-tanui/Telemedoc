// controllers/appointmentController.js
const db = require('../models');

exports.createAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_id, appointment_date, status } = req.body;

    const newAppointment = await db.Appointment.create({
      patient_id,
      doctor_id,
      appointment_date,
      status
    });

    res.status(201).json({ success: true, message: 'Appointment created successfully', data: newAppointment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create appointment', error });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await db.Appointment.findAll();
    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve appointments', error });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await db.Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve appointment', error });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAppointment = await db.Appointment.update(req.body, { where: { id } });

    if (updatedAppointment[0] === 0) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({ success: true, message: 'Appointment updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update appointment', error });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.Appointment.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete appointment', error });
  }
};