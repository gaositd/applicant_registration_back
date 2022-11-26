from fastapi import APIRouter, Response
from ..config.db import conn
from ..models.user import users
from ..schemas.userCreate import UserCreate
import json

router = APIRouter()

@router.get("/")
def getUsers():
    try:
        dbusers = conn.execute(users.select()).fetchall()
        return {"ok":"true", "data": dbusers }
    except Exception as e:
        return {"ok": False, "message": str(e)}


@router.get("/{id}")
def getUser(id:str, response:Response):
    user = conn.execute(users.select().where(id==id)).fetchone()
    if user is None:
        response.status_code == 404
        return {"ok": False, "message": "El usuario no existe."}
    return {"ok":True, "data": user}


@router.post("/")
def createUser(userData:UserCreate):
    data = conn.execute(users.insert().values(json.dumps(userData.__dict__)))
    return {"ok":True, "data":data}

