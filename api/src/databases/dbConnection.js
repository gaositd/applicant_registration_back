const dotenv = require('dotenv');
dotenv.config();
const { Sequelize } = require('sequelize');
const { MYSQL } = require('../constants/constants.js');

// console.log("\n\n\n");
// console.log(process.env);
// console.log("\n\n\n");
const db = new Sequelize(process.env.DATABASE, process.env.USR, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: MYSQL/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });

  module.exports = db;