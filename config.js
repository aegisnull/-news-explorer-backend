require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DB_LINK = 'mongodb://localhost:27017/NewsExplorerDB';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  PORT,
  DB_LINK,
  JWT_SECRET: isProduction ? process.env.JWT_SECRET : 'secretKey',
};
