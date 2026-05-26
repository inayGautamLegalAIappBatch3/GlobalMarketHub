const { body, validationResult } = require('express-validator');

const validateEmail = body('email')
  .isEmail()
  .normalizeEmail()
  .withMessage('Valid email required');

const validatePassword = body('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters')
  .matches(/[A-Z]/).withMessage('Password must contain uppercase letter')
  .matches(/[0-9]/).withMessage('Password must contain number')
  .matches(/[!@#$%^&*]/).withMessage('Password must contain special character');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

const validateRegistration = [
  body('firstName').notEmpty().withMessage('First name required'),
  body('lastName').notEmpty().withMessage('Last name required'),
  validateEmail,
  validatePassword,
  body('userType').isIn(['customer', 'vendor', 'professional']).withMessage('Invalid user type'),
  validateRequest
];

const validateLogin = [
  validateEmail,
  body('password').notEmpty().withMessage('Password required'),
  validateRequest
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateEmail,
  validatePassword,
  validateRequest
};
