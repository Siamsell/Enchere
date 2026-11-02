const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();


const sequelize = new Sequelize(
  "cynegcxx_enchres", 
  "cynegcxx_letessa",
  "lettesa@2025",
  {
    host: "178.32.109.176",
    dialect: 'mysql', 
    logging: false,
    dialectModule: require('mysql2'),
  }
);

const connectDB = async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


module.exports = {sequelize, connectDB};
