'use strict';
const router = require('./routes');
const express = require('express');
const db = require('./src/databases/dbConnection');
const server = express();
const port = process.env.PORT || 3001;

//passport
const cookieSession = require('express-session');
const cors = require('cors');
const passport = require('passport');
const passportSetup = require('./src/passport.js');
const authRoute = require('./routes/auth');
const { session } = require('passport');
//passport

server.use(express.json());
server.use(router);

server.use(cookieSession({
  secret: "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",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(cors({
  origin:'*',
  methods:"GET, POST, PUT, DELETE",
  crdenctials:true,
}));
server.use("/auth", authRoute);
//passport

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
