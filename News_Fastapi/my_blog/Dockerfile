FROM python:3.11

RUN mkdir /blog

WORKDIR /blog

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

# для разрешения bash скриптов
RUN chmod a+x docker/*.sh

# CMD gunicorn scr.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000