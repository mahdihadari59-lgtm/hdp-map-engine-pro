const express = require('express');
const router = express.Router();
const { getPlaces, getPlaceById } = require('../data');

router.get('/', (req, res) => {
  const { cat, limit = 2000 } = req.query;
  const rows = getPlaces(cat).slice(0, parseInt(limit) || 2000);
  res.json({ success: true, count: rows.length, results: rows });
});

router.get('/:id', (req, res) => {
  const row = getPlaceById(req.params.id);
  if (!row) return res.status(404).json({ success: false, error: 'این جا پیدا نشد!' });
  res.json({ success: true, result: row });
});

module.exports = router;
