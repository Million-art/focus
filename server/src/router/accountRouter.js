const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Define routes for attendance
router.post('/unlock', accountController.unlockAccount);


module.exports = router;
