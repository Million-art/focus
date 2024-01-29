const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Define routes for RouterIpAddress
router.get('/report', reportController.getAllRouterIpAddresses);
router.post('/report', reportController.addRouterIpAddress);
router.delete('/report/:id', reportController.deleteRouterIpAddress);

module.exports = router;
