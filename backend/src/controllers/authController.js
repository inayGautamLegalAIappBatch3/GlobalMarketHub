const User = require('../models/User');
const { generateToken, generateRefreshToken } = require('../middleware/auth');
const dotenv = require('dotenv');

dotenv.config();

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userType } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      userType
    });

    const token = generateToken({
      id: user.id,
      email: user.email,
      userType: user.userType
    });

    const refreshToken = generateRefreshToken({
      id: user.id
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        token,
        refreshToken
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Account suspended'
      });
    }

    await user.update({ lastLogin: new Date() });

    const token = generateToken({
      id: user.id,
      email: user.email,
      userType: user.userType
    });

    const refreshToken = generateRefreshToken({
      id: user.id
    });

    res.json({
      success: true,
      message: 'Logged in successfully',
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        avatar: user.avatar,
        token,
        refreshToken
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

const logout = (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token required'
      });
    }

    const decoded = require('../middleware/auth').verifyToken(token);
    if (!decoded) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired refresh token'
      });
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const newToken = generateToken({
      id: user.id,
      email: user.email,
      userType: user.userType
    });

    res.json({
      success: true,
      message: 'Token refreshed',
      data: {
        token: newToken
      }
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({
      success: false,
      message: 'Token refresh failed',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken
};
