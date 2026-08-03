const express = require('express');
const router = express.Router();

// Import all module routes
const trafficRoutes = require('../modules/traffic/routes/traffic');
const routingRoutes = require('../modules/routing/routes');
const navigationRoutes = require('../modules/navigation/routes');
const heatmapRoutes = require('../modules/heatmap/routes');
const tileRoutes = require('../modules/tile/routes');
const cameraRoutes = require('../modules/camera/routes');
const weatherRoutes = require('../modules/weather/routes');
const emergencyRoutes = require('../modules/emergency/routes');
const tourismRoutes = require('../modules/tourism/routes');
const transportRoutes = require('../modules/transport/routes');
const predictionRoutes = require('../modules/prediction/routes');
const offlineRoutes = require('../modules/offline/routes');
const clusterRoutes = require('../modules/cluster/routes');
const voiceRoutes = require('../modules/voice/routes');
const knowledgeRoutes = require('../modules/knowledge/routes');

router.use('/traffic', trafficRoutes);
router.use('/routing', routingRoutes);
router.use('/navigation', navigationRoutes);
router.use('/heatmap', heatmapRoutes);
router.use('/tile', tileRoutes);
router.use('/camera', cameraRoutes);
router.use('/weather', weatherRoutes);
router.use('/emergency', emergencyRoutes);
router.use('/tourism', tourismRoutes);
router.use('/transport', transportRoutes);
router.use('/prediction', predictionRoutes);
router.use('/offline', offlineRoutes);
router.use('/cluster', clusterRoutes);
router.use('/voice', voiceRoutes);
router.use('/knowledge', knowledgeRoutes);

module.exports = router;
