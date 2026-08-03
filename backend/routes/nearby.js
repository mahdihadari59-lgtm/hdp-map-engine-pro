const express = require('express');
const router = express.Router();
const { getNearby } = require('../data');

router.get('/', (req, res) => {
  const { lat, lon, radius = 1000, cat } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ success: false, error: 'مختصات رو بفرست برا!' });
  }
  const nearby = getNearby(parseFloat(lat), parseFloat(lon), parseFloat(radius), cat);
  res.json({ success: true, count: nearby.length, radius: parseFloat(radius), results: nearby });
});

module.exports = router;
