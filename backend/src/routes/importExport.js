const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Import/Export products listing',
    data: []
  });
});

router.post('/', authenticateToken, (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Import/Export product created'
  });
});

router.get('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Get import/export product',
    productId: req.params.id
  });
});

router.post('/:id/quote-request', authenticateToken, (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Quote request sent'
  });
});

router.get('/:id/compliance-docs', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Compliance documents',
    data: []
  });
});

module.exports = router;
