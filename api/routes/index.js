'use strict';
const express = require('express');
const cors = require('cors');
const {
  applicantForm_Table, disabilities,
  gender, locations, marital_statuses,
  mexican_states, months,
  municipalities, semester,
} = require('../models/applicantForm');
const { SERVER_ERROR } = require('../src/constants/constants.js');
const router = express.Router();


module.exports = router;

router.use(express.json());
router.use(cors());//Enabling other applications to make requests to our server

router.get('/disabilities', async function(req, res){
  const disability = await disabilities.findAll();
  
  console.log(disability);
  if(disability) res.json(disabilities)
  else res.status(500)
         .json({
             msg: SERVER_ERROR
         })
});