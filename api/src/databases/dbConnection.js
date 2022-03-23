const { Sequelize } = require('sequelize');
const {
  DATABASE,
  USER,
  PASSWORD,
  HOST,
  MYSQL
} = require('../constants/constants.js');

const db = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: MYSQL/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });

  module.exports = db;