const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'User profile',
    userId: req.user.id
  });
});

router.put('/profile', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Profile updated'
  });
});

router.post('/avatar', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Avatar uploaded'
  });
});

router.put('/password', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Password changed'
  });
});

router.post('/two-factor/enable', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: '2FA enabled'
  });
});

router.get('/wishlist', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'User wishlist',
    data: []
  });
});

module.exports = router;
