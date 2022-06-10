'use strict';
const router = require('./routes');
const express = require('express');
const db = require('./src/databases/dbConnection');
const server = express();
const port = process.env.PORT || 3001;

//passport
const cookieSession = require('cookie-session');
const cors = require('cors');
const passport = require('passport');

//passport

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

//passport
server.use(cookieSession({
  name:"session",
  keys:"test",
  maxAge:24*60*60*100,
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(cors({
  origin:'*',
  methods:"DELETE, PUT, GET, POST",
  crdenctials:true,
}));
//passport
server.listen(port,() => console.log(`Server run on port ${port}`));
//npm install passport-google-oauth20