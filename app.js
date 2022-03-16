const express = require('express');
const port = 3001;
const server = express();

server.get('/', function(req, res) {
    res.send('Hola Mundo!');
  });
  
  server.listen(port, function() {
    console.log(`Aplicación ejemplo, escuchando el puerto ${port}`);
  });