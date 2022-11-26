from sqlalchemy import Table,Column
from sqlalchemy.sql.sqltypes import Integer,String, Date, Enum, Boolean
from ..config.db import meta,engine
import enum
class genders(enum.Enum):
    hombre= "H"
    mujer = "M"
    otro = "?"

users = Table("users", meta, 
    Column("id", Integer, primary_key=True),
    Column("name", String(255)),
    Column("lastName", String(255)),
    Column("mail", String(255)),
    Column("birthDate",Date),
    Column("gender",Enum(genders)),
    Column("school",String(255)),
    Column("phone",String(255)),
    Column("isWorking", Boolean),
    Column("hasDisability",Boolean),
    Column("street", String(255)),
    Column("extNum", String(255)),
    Column("col", String(255)),
    Column("zipCode", String(255)),
    Column("knowsDialect", Boolean),
    Column("state", String(255)),
    Column("city",String(255)),
    Column("curp", String(255))
)

meta.create_all(engine)