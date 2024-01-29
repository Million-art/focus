const express = require('express');
const router = express.Router(); 
const employeeController = require('../controllers/employeeController');

// Define routes for employees
router.get('/employees', employeeController.getAllEmployees);
router.get('/employees/:id', employeeController.getEmployeeById);
router.post('/employees', employeeController.addEmployee);
router.put('/employees/:id', employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

router.post('/login', employeeController.login);
router.post('/logout', employeeController.logout);
 
module.exports = router;
