const express = require('express');
const router = express.Router();
const { getStats } = require('../data');

router.get('/', (req, res) => {
  res.json({ success: true, ...getStats() });
});

module.exports = router;
