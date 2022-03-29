'use strict';
const router = require('./routes');
const express = require('express');
const db = require('./src/databases/dbConnection');
const server = express();
const port = process.env.PORT || 3001;

server.use(express.json());
server.use(router);

(async ()=>{
  try {
    await db.authenticate();
    await db.sync();
    console.log('database connection successfully');
  } catch (error) {
    msg:`Fail connection ==>> ${error}`;
  }
})()


server.listen(port,() => console.log(`Server run on port ${port}`));