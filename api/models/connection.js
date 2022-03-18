// const dbConfig = require('../../database/db.config.js');
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,
//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// });
// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
// module.exports = db;

// /*https://www.bezkoder.com/node-js-express-sequelize-mysql/      https://programmerclick.com/article/63361107197/*/
const sequielize = require('sequelize');

const dbCxn = require('../../database/db.config.js');//server config
const sequelizeCxn = new sequielize(dbCxn.DB, dbCxn.USER, dbCxn.PASSWORD,{
    dialect: dbCxn.dialect,
    host:dbCxn.HOST,
    post: dbCxn.PORT,
    dialectOptions: {
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
        supportBigNumbers: true,
        bigNumberStrings: true
      },
    define:{
        underscore: false,
        freezeTableName: false,
        charset:'utf8',
        dialectOptions:{
            collate:'utf8_general_ci',
        },
        timestamps:true,
    },
    sync:{
        force:true,
    },
    pool:{
        max:dbCxn.pool.max,
        min:dbCxn.pool.min,
        acquire: dbCxn.pool.acquire,
    },
    isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
})
