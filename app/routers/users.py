from fastapi import APIRouter

users = []

router = APIRouter()


@router.get("/")
def getUsers():
    return {"message": "Read all users"}
