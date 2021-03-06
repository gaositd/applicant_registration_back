const { DataTypes } = require("sequelize");

const db = require("../src/databases/dbConnection");

const applicantForm_Table = db.define(process.env.APPLICANTFORM_TABLE,{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
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
        type:DataTypes.TEXT,
        allowNull: false,
        comment:'Route of the birth Certificate file',
    },
    curp:{
        type:DataTypes.STRING(8),
        allowNull: false,
        comment:'C.U.R.P text',
    },
    curpPdf:{
        type:DataTypes.TEXT,
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
        type:DataTypes.TEXT,
        allowNull: false,
        comment:'Route of the certificate last school file',
    },
    miniPicture:{
        type:DataTypes.TEXT,
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
const genders = db.define(process.env.GENDER,{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique: true
    },
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
const marital_statuses = db.define(process.env.MARITAL_STATUS,{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique: true
    },
    long_name:{
        type:DataTypes.STRING(40),
        allowNull:false,
        comment:'Palabra completa del estado civil',
    },
    short_name:{
        type:DataTypes.STRING(3),
        allowNull:false,
        comment: 'abreviatura a 3 letras del estado civil',
    },
    description:{
        type:DataTypes.STRING,
        comment:'Significado del estado civil',
    },
    language:{
        type:DataTypes.STRING(3),
        allowNull: false,
        comment:'Language description',
    },
});
const locations = db.define(process.env.LOCATIONS, {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique: true
    },
    id_town:{
        type:DataTypes.INTEGER,
        unique: true,
        allowNull:false,
        comment:'Relaci??n: municipios -> id',
    },
    key:{
        type:DataTypes.STRING(3),
        allowNull:false,
        comment:'CVE_LOC ??? Clave de la localidad'
    },
    name:{
        type:DataTypes.STRING(100),
        allowNull:false,
        comment:'NOM_LOC ??? Nombre de la localidad',
    },
    latitude:{
        type:DataTypes.STRING(15),
        allowNull:false,
        comment:'LATITUD ??? Latitud (en DMS)',
    },
    lenght:{
        type:DataTypes.STRING(15),
        allowNull:false,
        comment:'LONGITUD ??? Longitud (en DMS)',
    },
    altitude:{
        type:DataTypes.STRING(15),
        allowNull:false,
        comment:'ALTITUD ??? Altitud',
    },
    letter:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    },
    ambit:{
        type:DataTypes.STRING(1),
        allowNull:false,
        comment:'AMBITO',
    },
    population:{
        type:DataTypes.INTEGER,
        comment:'PTOT ??? Poblaci??n Total',
    },
    male:{
        type:DataTypes.INTEGER,
        comment:'Poblaci??n masculina',
    },
    female:{
        type:DataTypes.INTEGER,
        comment:'Poblaci??n femenina',
    },
    houses:{
        type:DataTypes.INTEGER,
        comment:'VTOT ??? N??mero total de viviendas',
    },
    lat:{
        type:DataTypes.DECIMAL(10,7),
        allowNull:false,
        comment:'Latitud en decimal',
    },
    lng:{
        type:DataTypes.DECIMAL(10,7),
        allowNull:false,
        comment:'Longitud en decimal',
    },
    active:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        comment:'Municipio activo o inactivo (borrado l??gico)',
    },
});
const mexican_states = db.define(process.env.MEXICAN_STATES, {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique: true
    },
    key:{
        type:DataTypes.STRING(2),
        allowNull:false,
        comment:'CVE_ENT - Clave de la entidad',
    },
    name:{
        type:DataTypes.STRING(40),
        allowNull:false,
        comment:'NOM_ENT - Nombre de la entidad',
    },
    short_name:{
        type:DataTypes.STRING(10),
        comment:'NOM_ABR - Nombre abreviado de la entidad',
    },
    active:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        comment:'NOM_ABR - Nombre abreviado de la entidad',
    },
});
const months = db.define(process.env.MONTHS,{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique: true
    },
    spanishMonth:{
        type:DataTypes.STRING(20),
        allowNull:false,
        comment:'Nombre del mes en espa??ol',
    },
    spanishMonth:{
        type:DataTypes.STRING(20),
        allowNull:false,
        comment:'Nombre del mes en ingles',
    },
    shortNameSpanish:{
        type:DataTypes.STRING(3),
        allowNull:false,
        comment:'Nombre del mes en espa??ol (abreviatura)',
    },
    shortNameEnglish:{
        type:DataTypes.STRING(3),
        allowNull:false,
        comment:'Nombre del mes en ingles (abreviatura)',
    }
});
const municipalities = db.define(process.env.MUNICIPALITIES,{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique: true
    },
    id_states:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'Relaci??n: estados -> id',
    },
    key:{
        type:DataTypes.STRING(3),
        allowNull:false,
        comment:'CVE_MUN ??? Clave del municipio',
    },
    name:{
        type:DataTypes.STRING(100),
        allowNull:false,
        comment:'NOM_MUN ??? Nombre del municipio',
    },
    active:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    },
});
const semester = db.define(process.env.SEMESTER,{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique: true
    },
    initialMonth:{
        type:DataTypes.STRING(20),
        allowNull:false,
        comment:'initial month of semester',
    },
    finishMonth:{
        type:DataTypes.STRING(20),
        allowNull:false,
        comment:'finish month of semester',
    },
    cycle:{
        type:DataTypes.STRING(1),
        allowNull:false,
        comment:'Cycle A or B',
    },
});
const disabilities = db.define(process.env.DISABILITIES,{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        unique: true
    },
    description:{
        type:DataTypes.STRING(100),
        allowNull: false,
        comment: 'Disability description',
    },
    language:{
        type:DataTypes.STRING(3),
        allowNull: false,
        comment:'Language description',
    },
})

module.exports = {
    applicantForm_Table,
    genders,
    marital_statuses,
    locations,
    mexican_states,
    months,
    municipalities,
    semester,
    disabilities,
}