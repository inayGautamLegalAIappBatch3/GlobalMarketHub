const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth');

router.get('/dashboard', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Admin dashboard',
    data: {
      totalUsers: 0,
      totalVendors: 0,
      totalProfessionals: 0,
      totalRevenue: 0
    }
  });
});

router.get('/users', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({
    success: true,
    message: 'All users',
    data: []
  });
});

router.put('/users/:id/status', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({
    success: true,
    message: 'User status updated'
  });
});

router.get('/vendors/pending', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Pending vendor approvals',
    data: []
  });
});

router.post('/vendors/:id/approve', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Vendor approved'
  });
});

router.post('/professionals/:id/verify', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Professional verified'
  });
});

router.get('/reports', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Reports',
    data: []
  });
});

module.exports = router;
