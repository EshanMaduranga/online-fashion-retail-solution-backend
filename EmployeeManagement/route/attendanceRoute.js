// attendance.route.js

const express = require('express');
const router = express.Router();
const Attendance = require('../model/attendance.model')

// Route to record attendance
router.post('/', async (req, res) => {
  const { employeeId, status } = req.body;

  try {
    const newAttendance = new Attendance({
      employeeId,
      status,
      date: new Date(), // Add the current date to the attendance record
    });

    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;