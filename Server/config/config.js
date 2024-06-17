require('dotenv').config();
const {PORT, NODE_ENV, DB_HOST, DB_PORT, DB_PASSWORD} = process.env;
module.exports = {PORT, NODE_ENV, DB_HOST, DB_PORT,DB_PASSWORD};