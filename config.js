require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DB_LINK = 'mongodb://localhost:27017/NewsExplorer_DB';

module.exports = {
  PORT,
  DB_LINK
};
