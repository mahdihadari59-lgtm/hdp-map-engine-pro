const express = require('express');
const router = express.Router();
const controller = require('./controllers/PoiController');

router.get('/pois', controller.getPois);
router.get('/pois/nearby', controller.getNearbyPois);
router.get('/pois/categories', controller.getCategories);
router.get('/pois/:id', controller.getPoiById);

module.exports = router;
