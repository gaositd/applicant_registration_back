const router = require('express').Router();

const { 
    mexican_states,
    municipalities,

 } = require('../models/applicantForm');
const {  STATE_NOT_FOUND, } = require('../src/constants/constants.js')

module.exports = router;

//get all mexican states
router.get('/', async function(req, res) {
    const States = await mexican_states.findAll();
    res.json(States);
});
//get state by id
// router.get('/:stateId', async function(req, res) {
//     const {stateId} = req.params;
//     const State = await mexican_states.findByPk(parseInt(stateId));

//     if(State)
//         res.json(State);
//     else
//         res.status(404)
//            .json({
//                msg:STATE_NOT_FOUND
//            });
    
// });
//get all towns
router.get('/town', async function(req, res) {
    const municipal = await municipalities.findAll();
    res.json(municipal);
});
//get towns by state id
router.get('/town/:stateId', function(req, res){
    const {stateId} = req.params;
    const municipal = municipalities.findAll(mun => mum.stateId === parseInt(stateId));

    if(municipal)
        res.json(municipal);
    else
        res.status(404)
           .json({
                msg:STATE_NOT_FOUND
            });
});
//new mexican states, not use please
// router.post('/states', function(req, res) {
//     const { id, name, middleName, lastName, state, town, school, stateSchool, townSchool  } = req.body;
//     res.json({
        
//     });
// });