const Sequelize = require('sequelize');

const sequelize = new Sequelize('applicantForm', 'root', '', {
    host: 'localhost',
    dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });