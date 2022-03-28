//DATABASE NAME
const DATABASE = "applicantForm";

//TABLES
const APPLICANTFORM_TABLE = "applicantForm_Table";
const GENDER = "gender";
const MARITAL_STATUS = "marital_status";
const LOCATIONS = "locations";
const MEXICAN_STATES = "mexican_states";
const MONTHS = "months";
const MUNICIPALITIES = "municipalities";
const SEMESTER = "semester";
const DISABILITIES = 'disabilities';

//SERVER
const HOST = "localhost";
const PORT = 3306;
const USER = "root";
const PASSWORD = "";
const MYSQL = "mysql";
const MARIADB = "mariadb";
const POSTGRES = "postgres";
const MSSQL = "mssql";

//routes
const STATE_NOT_FOUND = 'State not found';

module.exports = {
    DATABASE,
    APPLICANTFORM_TABLE,
    GENDER,
    MARITAL_STATUS,
    LOCATIONS,
    MEXICAN_STATES,
    MONTHS,
    MUNICIPALITIES,
    SEMESTER,
    DISABILITIES,
    HOST,
    PORT,
    USER,
    PASSWORD,
    MYSQL,
    MARIADB,
    POSTGRES,
    MSSQL,
    STATE_NOT_FOUND,
}