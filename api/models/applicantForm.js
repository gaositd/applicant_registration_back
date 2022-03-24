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
    idApplicant:{
        type:DataTypes.STRING(40),
        primaryKey:true,
        allowNull: false,
        unique: true
    },
    captureDate:{
        type:DataTypes.DATE,
        allowNull: false,
        comment: 'Date of form capture'
    },
    names:{
        type:DataTypes.STRING(50),
        allowNull: false,
        comment:'Name or names only',
    },
    firstName:{
        type:DataTypes.STRING(70),
        allowNull: false,
        comment:'apellido Materno',
    },
    lastName:{
        type:DataTypes.STRING(70),
        allowNull: false,
        comment:'apellido Paterno',
    },
    mail:{
        type:DataTypes.STRING(80),
        allowNull: false,
    },
    dateOfBirth:{ 
        type:DataTypes.DATE,
        allowNull: false,
        comment:'Date of birth',
    },
    birthCertificate:{
        type:DataTypes.STRING,
        allowNull: false,
        comment:'Route of the birth Certificate file',
    },
    curp:{
        type:DataTypes.STRING(8),
        allowNull: false,
        comment:'C.U.R.P text',
    },
    curpPdf:{
        type:DataTypes.STRING,
        allowNull: false,
        comment:'Route of the curp file',
    },
    actualAddress:{
        type:DataTypes.STRING(150),
        allowNull: false,
    },
    lastSchool:{
        type:DataTypes.STRING(150),
        allowNull: false,
        comment:'Previous school',
    },
    averageLastSchool:{
        type:DataTypes.INTEGER,
        allowNull: false,
        comment:'Average last school',
    },
    stateLastSchool:{
        type:DataTypes.INTEGER,
        allowNull: false,
        comment:'Id of state of school',
    },
    townOfSchool:{
        type:DataTypes.INTEGER,
        allowNull: false,
        comment:'Id of town of school',
    },
    certificateLastSchool:{
        type:DataTypes.STRING,
        allowNull: false,
        comment:'Route of the certificate last school file',
    },
    miniPicture:{
        type:DataTypes.TIME,
        allowNull: false,
        comment:'Route of the mini picture file',
    },
    maritalStatus:{
        type:DataTypes.STRING(3),
        allowNull: false,
        comment:'Current marital status',
    },
    gender:{
        type:DataTypes.STRING(3),
        allowNull: false,
        comment: 'Gender Male, Female or not say',
    },
    actualWork:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
    },
    typeSchool:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
        comment:'Public or private School',
    },
    telephone:{
        type:DataTypes.INTEGER,
        allowNull: false,
        comment:'Home telephone',
    },
    cellphone:{
        type:DataTypes.STRING(15),
        allowNull: false,
        comment:'Personal cellphone',
    },
    states:{
        type:DataTypes.INTEGER,
        allowNull: false,
        comment:'Id state of the republic',
    },
    towns:{
        type:DataTypes.INTEGER,
        allowNull: false,
        comment:'Id towns of the states',
    },
    dialect:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    disability:{
        type:DataTypes.INTEGER,
        allowNull: false,
        comment:'Id of disability',
    },
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