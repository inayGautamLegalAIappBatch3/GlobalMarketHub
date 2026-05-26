const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

router.post('/process', authenticateToken, (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Payment processed',
    transactionId: 'TXN-' + Date.now()
  });
});

router.get('/:id', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Payment details',
    paymentId: req.params.id
  });
});

router.post('/refund', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Refund processed'
  });
});

router.post('/webhook/stripe', (req, res) => {
  res.json({
    success: true,
    message: 'Webhook received'
  });
});

module.exports = router;
