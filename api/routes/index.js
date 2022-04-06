'use strict';
const express = require('express');
const cors = require('cors');
const {
  applicantForm_Table, disabilities,
  genders, locations, marital_statuses,
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
    // console.log(disability);
    res.status(200).json(disabilities);})
  .catch(err => {
      res.status(500)
         .json({msg: `${process.env.SERVER_ERROR} ${err}`})
    });
});

router.get('/marital_statuses', function(req, res){

  // const disability = await marital_statuses.findAll({ 
  //   where: {language :'esp'},
  // })
  // marital_statuses.findAll()//funciona
  marital_statuses.findAll({//alias fields
    attributes:['id', ['long_name','description'], ['description','full_description']]
  })
  .then(marital_statuses => {
    res.status(200).json(marital_statuses);})
  .catch(err => {
      res.status(500)
         .json({msg: `${process.env.SERVER_ERROR} ${err}`})
    });
});

router.get('/mexican_states', function(req, res) {
  mexican_states.findAll({
    attributes:['id', ['name','description'],'short_name']
  })
  .then(mexican_states => {
    res.status(200)
       .json(mexican_states);})
  .catch(err => {
      res.status(500)
         .json({msg: `${process.env.SERVER_ERROR} ${err}`})
    });
});

router.get('/genders', function(req, res) {
  genders.findAll({
    attributes:['id', ['long_name','description']]
  })
    .then(gender =>{
      res.status(200)
         .json(gender);
    })
    .catch(err =>{
      res.status(500)
         .json({
            msg:`${process.env.SERVER_ERROR} ${err}`
          });
    });
});