require('dotenv').config();

const PORT = process.env.PORT;
const DB_LINK = process.env.DB_LINK;

module.exports = {
  PORT,
  DB_LINK
};
