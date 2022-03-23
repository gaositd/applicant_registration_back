const { DataTypes } = require("sequelize");

const db = require("../src/databases/dbConnection");
const { 
    APPLICANTFORM_TABLE,
    GENDER,
    MARITAL_STATUS,
    LOCATIONS,
    MEXICAN_STATES,
    MONTHS,
    MUNICIPALITIES,
    SEMESTER,
 } = require('../src/constants/constants.js');

const applicantForm_Table = db.define(APPLICANTFORM_TABLE,{
    idApplicant:{},
    captureDate:{},
    names:{},
    firstName:{},
    lastName:{},
    mail:{},
    dateOfBirth:{},
    birthCertificate:{},
    curp:{},
    curpPdf:{},
    actualAddress:{},
    lastSchool:{},
    averageLastSchool:{},
    stateLastSchool:{},
    townOfSchool:{},
    certificateLastSchool:{},
    miniPicture:{},
    maritalStatus:{},
    gender:{},
    actualWork:{},
    typeSchool:{},
    telephone:{},
    cellphone:{},
    states:{},
    town:{},
    dialect:{},
    disability:{},
});
const gender = db.define(GENDER,{
    long_name:{
        type:DataTypes.STRING(20),
    },
    short_name:{
        type:DataTypes.STRING(3),
    },
    language:{
        type:DataTypes.STRING(3),
    }
});
const marital_status = db.define(MARITAL_STATUS,{

});
const locations = db.define(LOCATIONS, {

});
const mexican_states = db.define(MEXICAN_STATES, {

});
const months = db.define(MONTHS,{

});
const municipalities = db.define(MUNICIPALITIES,{

});
const semester = db.define(SEMESTER,{

});

module.exports = {
    applicantForm_Table,
    gender,
    marital_status,
    locations,
    mexican_states,
    months,
    municipalities,
    semester,
}