const router = require('express').Router();

const { gender } = require('../models/applicantForm');

module.exports = router;

//get all form questions
router.get('/', async function(req, res) {
    const Gender = await gender.findAll();
    res.json(Gender);
});
//get form by ID
router.get('/:id', function(req, res) {
    const { id, name, middleName, lastName, state, town, school, stateSchool, townSchool  } = req.params;
    res.json({
        id,
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
//create applicant regisatration form
router.post('/d', function(req, res) {
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