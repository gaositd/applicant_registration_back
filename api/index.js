//database connection and general configuration
// Use Ecmascript 6 functionality
'use strict'
var sequelize = require('sequelize');// Cargamos el módulo de mongoose para poder conectarnos a MongoDB
var app = require('./app');// *Load the app.js file with Express configuration
var port = 3001;//Create the PORT variable to indicate the port on which the server is going to operate
// mongoose.Promise = global.Promise;// To indicate to Sequelize that we will make the connection with Promises
// mongoose.connect('mongodb://localhost:27017/curso_mean_social',  { useMongoClient: true})// use the connect method to connect to our database
//     .then(() => {        
//         console.log("The connection to the database was successful.")// CWhen the connection is made, we launch this message by console
    
//         app.listen(port, () => {// CREATE THE WEB SERVER WITH NODEJS
//             console.log(`server run on http://localhost:${port}`);
//         });
//     })
//     .catch(err => console.log(err));//If it does not connect correctly we spit out the error