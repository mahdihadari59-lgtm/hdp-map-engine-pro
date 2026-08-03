const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json({ success: true, message: 'emergency module' }));
module.exports = router;
