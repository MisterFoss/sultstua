FROM python:3.8-slim AS builder

RUN apt update
RUN apt install gcc -y 

COPY requirements.txt .

# install dependencies to the local user directory (eg. /root/.local)
RUN pip install --user -r requirements.txt

# second unnamed stage
FROM python:3.8-slim
WORKDIR /app

# copy only the dependencies installation from the 1st stage image
COPY --from=builder /root/.local /root/.local

ENV PATH=/root/.local:$PATH

# CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
