const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Professional = sequelize.define('Professional', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: 'id' }
  },
  professionalType: {
    type: DataTypes.ENUM('doctor', 'lawyer', 'accountant', 'engineer', 'teacher', 'trainer', 'therapist', 'plumber', 'electrician', 'other'),
    allowNull: false
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false
  },
  qualifications: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  profileImage: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  licenseNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  licenseDocument: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hourlyRate: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  languages: {
    type: DataTypes.JSON,
    defaultValue: ['English']
  },
  availableHours: {
    type: DataTypes.JSON,
    defaultValue: {}
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  totalReviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'suspended'),
    defaultValue: 'active'
  },
  commissionRate: {
    type: DataTypes.FLOAT,
    defaultValue: 0.15
  },
  totalEarnings: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
});

Professional.belongsTo(User, { foreignKey: 'userId' });

module.exports = Professional;
