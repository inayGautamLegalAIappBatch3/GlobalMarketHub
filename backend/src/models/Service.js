const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Professional = require('./Professional');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  professionalId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Professional, key: 'id' }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  serviceType: {
    type: DataTypes.ENUM('consultation', 'training', 'professional_service', 'other'),
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 60,
    comment: 'Duration in minutes'
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  totalReviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalBookings: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Service.belongsTo(Professional, { foreignKey: 'professionalId' });

module.exports = Service;
