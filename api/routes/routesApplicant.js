const router = require('express').Router();

const { mexican_states } = require('../models/applicantForm');

module.exports = router;

//get all form questions
router.get('/', async function(req, res) {
    const States = await mexican_states.findAll();
    console.log(States);
    res.json(States);
});
//get form by ID
router.get('/:id', function(req, res) {
    const State = mexican_states.findAll(state => state.id === parseInt(req.params.id));
    // res.json(State);
    console.log(id);
    console.log(typeof(id));
    res.end();
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