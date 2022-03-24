//server
//const { json } = require('body-parser');
const cors = require('cors');
const express = require('express');

const routeApplicant = require('../routes/routesApplicant');
const db = require('./databases/dbConnection');
const server = express();
const port = process.env.PORT || 3001;

(async ()=>{
  try {
    await db.authenticate();
    await db.sync();
    console.log('database connection successfully');
  } catch (error) {
    msg:`Fail connection ==>> ${error}`;
  }
})()

//change strig to json (middleware)
server.use(express.json());//receive data
server.use(cors());//Enabling other applications to make requests to our app

server.use('/form',routeApplicant);

server.listen(port, function() {
  console.log(`App running on http://localhost:${port}/`);
});