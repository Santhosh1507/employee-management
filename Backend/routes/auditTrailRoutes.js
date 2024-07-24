const express = require('express');
const router = express.Router();
const auditTrailController = require('../controllers/auditTrailController');
const { verifyToken } = require('../middlewares/auth');

router.get('/', verifyToken, auditTrailController.getAuditTrails);

module.exports = router;
