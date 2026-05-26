const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USER || 'gmh_user',
  password: process.env.DATABASE_PASSWORD || 'secure_password_123',
  database: process.env.DATABASE_NAME || 'globalmarkethub',
  dialect: 'postgres',
  logging: process.env.DEBUG === 'true' ? console.log : false,
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
