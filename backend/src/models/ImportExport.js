const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Vendor = require('./Vendor');

const ImportExport = sequelize.define('ImportExport', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  vendorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Vendor, key: 'id' },
    comment: 'Exporter vendor'
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  hsCode: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Harmonized System code for customs'
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  minimumOrder: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unitPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'USD'
  },
  availability: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Country of origin'
  },
  certifications: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  leadTime: {
    type: DataTypes.INTEGER,
    defaultValue: 30,
    comment: 'Lead time in days'
  },
  paymentTerms: {
    type: DataTypes.ENUM('COD', 'Invoice', 'Prepayment', 'LC'),
    defaultValue: 'Invoice'
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

ImportExport.belongsTo(Vendor, { foreignKey: 'vendorId' });

module.exports = ImportExport;
