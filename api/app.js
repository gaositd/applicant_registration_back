//create web server with nodeJs and express configuration
// const express = require('express');
// const port = 3001;
// const server = express();

// server.get('/', function(req, res) {
//     res.send('Hola Mundo!');
//   });
  
//   server.listen(port, function() {
//     console.log(`Aplicación ejemplo, escuchando el puerto ${port}`);
//   });

// Use Ecmascript 6 functionality
'use strict'
var express = require('express');
var bodyParser = require('body-parser');// Load express and body-parser modules
var server = express();// We call express in order to create the server
var user_routes = require('./routes/user');// Import routes
 //Load middlewares
 //un metodo que se ejecuta antes que llegue a un controlador

// app.use(bodyParser.urlencoded({extended:false}));//Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
// app.use(bodyParser.json());
// app.use('/api', user_routes);// Cargamos las rutas
// module.exports = app;// exportamos este módulo para poder usar la variable app fuera de este archivo