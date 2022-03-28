const router = require('express').Router();

const { disabilities } = require('../models/applicantForm');

module.exports = router;

//get all disabilities
router.get('/', async function(req, res) {
    const disabilityList = await disabilities.findAll();
    res.json(disabilityList);
});