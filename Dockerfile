FROM python:3.10.8

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . . 

CMD [ "python3", "-m" , "uvicorn", "app.main:app", "--port 4242"]