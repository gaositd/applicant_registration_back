from fastapi import FastAPI
from .routers import users
print("Este es un mensaje de bienvenida!")

app = FastAPI(
)

@app.get("/")
async def helloWorld():
    return {"message": "Hola mundo mundial!"}


@app.post("/")
async def helloWorld():
    return {"message": "Hola mundo mundial!"}

# Aqui se incluye a la app un router
app.include_router(users.router)



