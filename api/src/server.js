//server
//const { json } = require('body-parser');
const cors = require('cors');
const express = require('express');

const routeApplicant = require('../routes/routesApplicant');
const server = express();
const port = process.env.PORT || 3001;

//change strig to json (middleware)
server.use(express.json());//receive data
server.use(cors());//Enabling other applications to make requests to our app

server.use('/form',routeApplicant);

server.listen(port, function() {
  console.log(`App running on http://localhost:${port}/`);
});