const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json({ success: true, message: 'transport module' }));
module.exports = router;
