const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Services listing',
    data: []
  });
});

router.post('/', authenticateToken, (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Service created'
  });
});

router.get('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Get service by ID',
    serviceId: req.params.id
  });
});

router.post('/:id/book', authenticateToken, (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Service booked successfully'
  });
});

router.get('/:id/availability', (req, res) => {
  res.json({
    success: true,
    message: 'Get service availability'
  });
});

module.exports = router;
