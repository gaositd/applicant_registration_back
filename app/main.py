from fastapi import FastAPI
from .routers import users

app = FastAPI()


@app.get("/")
def helloWorld():
    return "Hello World!"

app.include_router(router=users.router, prefix="/users", tags=['users'])