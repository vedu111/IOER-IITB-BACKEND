// routes/india.js
const express = require('express');
const indiaController = require('../controller/indiaController');

const router = express.Router();

router.post('/api/find-by-description', indiaController.findByDescription);
router.post('/api/check-export-compliance', indiaController.checkExportCompliance);

module.exports = router;