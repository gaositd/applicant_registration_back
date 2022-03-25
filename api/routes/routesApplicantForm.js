const router = require('express').Router();

const { marital_statuses } = require('../models/applicantForm');
const {  STATE_NOT_FOUND, } = require('../src/constants/constants.js')

module.exports = router;

//get all form questions
router.get('/', async function(req, res) {
    const States = await marital_statuses.findAll();
    console.log(States);
    res.json(States);
});
//get form by ID
router.get('/:id', async function(req, res) {
    const {id} = req.params;
    const State = await marital_statuses.findByPk(parseInt(id));

    if(State)
        res.json(State);
    else
        res.status(404)
           .json({
               msg:STATE_NOT_FOUND
           });
    
});
//create applicant regisatration form
router.post('/form', function(req, res) {
    const { id, name, middleName, lastName, state, town, school, stateSchool, townSchool  } = req.body;
    res.json({
        id:1,
        name:"test",
        middleName,
        lastName,
        state,
        town,
        school,
        stateSchool,
        townSchool,
    });
});