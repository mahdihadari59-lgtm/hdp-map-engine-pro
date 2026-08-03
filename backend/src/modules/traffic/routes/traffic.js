const express = require('express');
const router = express.Router();
const controller = require('../controllers/TrafficController');

router.get('/hotspots', controller.getHotspots);
router.post('/hotspots', controller.createHotspot);
router.get('/hotspots/:id', controller.getHotspotById);
router.delete('/hotspots/:id', controller.deleteHotspot);

router.get('/cameras', controller.getCameras);
router.post('/cameras', controller.createCamera);
router.get('/cameras/:id', controller.getCameraById);
router.patch('/cameras/:id/status', controller.updateCameraStatus);

router.get('/fines', controller.getFines);
router.post('/fines', controller.createFine);
router.get('/fines/stats', controller.getFineStats);

router.get('/stats', controller.getTrafficStats);
router.get('/nearby', controller.getNearbyTraffic);

module.exports = router;
