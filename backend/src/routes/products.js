const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Products endpoint',
    data: []
  });
});

router.post('/', authenticateToken, (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Product created'
  });
});

router.get('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Get product by ID',
    productId: req.params.id
  });
});

router.put('/:id', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Product updated'
  });
});

router.delete('/:id', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Product deleted'
  });
});

module.exports = router;
