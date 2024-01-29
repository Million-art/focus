const express = require('express');
const router = express.Router();
const routerController = require('../controllers/RouterController');
const wifiScan = require('../controllers/wifiScan')
// Define routes for RouterIpAddress
router.get('/set', routerController.getAllRouters);
router.post('/set', routerController.addRouter);
// router.put('/router-ip/:id', routerController.updateRouterIpAddress);
router.delete('/set/:id', routerController.deleteRouter);
// Add new route for retrieving and comparing IPs
router.get('/scan', wifiScan.getAvailableWifi)
module.exports = router;
