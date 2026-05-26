const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Vendor = sequelize.define('Vendor', {
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
  shopName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  shopDescription: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  shopLogo: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  shopBanner: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  businessRegistration: {
    type: DataTypes.STRING,
    allowNull: false
  },
  businessDocument: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bankAccountNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bankName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pincode: {
    type: DataTypes.STRING,
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
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'suspended'),
    defaultValue: 'pending'
  },
  commissionRate: {
    type: DataTypes.FLOAT,
    defaultValue: 0.05
  },
  totalSales: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  totalEarnings: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
});

Vendor.belongsTo(User, { foreignKey: 'userId' });

module.exports = Vendor;
