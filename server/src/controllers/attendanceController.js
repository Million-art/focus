 // controllers/attendanceController.js
const Attendance = require('../model/Attendance');

const attendanceController = {
  getAllEmployeeAttendance: async (req, res) => {
    try {
      const attendance = await Attendance.getAllEmployeeAttendance();
      res.json(attendance);
    } catch (err) {
      console.error('Error fetching employee attendance:', err);
      res.status(500).send('Error fetching employee attendance');
    }
  },
  getEmployeeAttendanceById: async (req, res) => {
    const { id } = req.params;
    try {
      const attendance = await Attendance.getEmployeeAttendanceById(id);
      res.json(attendance);
    } catch (err) {
      console.error('Error fetching employee attendance:', err);
      res.status(500).send('Error fetching employee attendance');
    }
  },
  addEmployeeClockIn: async (req, res) => {
    const { id } = req.params;
    try {
      await Attendance.addEmployeeClockIn(id);
      res.status(201).send('Clockin successful');
    } catch (err) {
      console.error('Error adding clock-in:', err);
      res.status(500).send('Error adding clock-in');
    }
  },
   
  addEmployeeClockOut: async (req, res) => {
    const { id } = req.params;
    try {
      await Attendance.addEmployeeClockOut(id);
      res.status(201).send('Clockout successful');
    } catch (err) {
      console.error('Error adding clock-out:', err);
      res.status(500).send('Error adding clock-out');
    }
  },


};

module.exports = attendanceController;
