const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json({ success: true, message: 'heatmap module' }));
module.exports = router;
