//server
const express = require('express');

const routeApplicant = require('../routes/routesApplicant');
const server = express();
const port = process.env.PORT || 3001;


// server.get('/', function(req, res) {
//   // res.send('Hola Mundo!');
//   res.json({
//     msg:"Hola mundo, mundial",
//   });
// });

server.use('/form',routeApplicant);

server.listen(port, function() {
  console.log(`Aplicación ejemplo, escuchando el puerto ${port}!`);
});