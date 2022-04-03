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
  const { description, language } = req.query;

  // const disability = await disabilities.findAll({ atribute: description, language })
  const disability = await disabilities.findAll({ 
    where: {language :'esp'},
  })
  .then(disabilities => {
    const disability = JSON.stringify(disabilities);
    console.log(disability);
    res.status(200).json(disabilities);})
  .catch(err => {
      res.status(500)
         .json({msg: `${process.env.SERVER_ERROR} ${err}`})
    });
});