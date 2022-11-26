from pydantic import BaseModel


class UserCreate(BaseModel):
    name:str
    lastName:str
    mail:str
    birthDate:str
    gender:str
    school:str
    isWorking:bool
    hasDisability:bool
    street:str
    extNum:str
    col:str
    zipCode:str
    knowsDialect:str
    state:str
    city:str
    curp:str