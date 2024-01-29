const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Define routes for attendance
router.get('/employee-attendance', attendanceController.getAllEmployeeAttendance);
router.get('/employee-attendance/:id', attendanceController.getEmployeeAttendanceById);
router.post('/employee-attendance/:id/clockin', attendanceController.addEmployeeClockIn);
router.post('/employee-attendance/:id/clockout', attendanceController.addEmployeeClockOut);

module.exports = router;
