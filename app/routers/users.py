from fastapi import APIRouter


router = APIRouter(prefix="/users")

@router.get("/")
def getUsers():
    return {"message": "Este es el endpoint de usuarios"}