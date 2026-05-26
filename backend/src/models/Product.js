const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Vendor = require('./Vendor');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  vendorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Vendor, key: 'id' }
  },
  sku: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subcategory: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  salePrice: {
    type: DataTypes.FLOAT,
    defaultValue: null
  },
  discount: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  weight: {
    type: DataTypes.FLOAT,
    defaultValue: null
  },
  dimensions: {
    type: DataTypes.JSON,
    defaultValue: null
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  totalReviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'discontinued'),
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

Product.belongsTo(Vendor, { foreignKey: 'vendorId' });

module.exports = Product;
