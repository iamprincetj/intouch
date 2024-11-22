FROM docker/compose:1.29.2 as compose

WORKDIR /app

COPY . .

RUN docker-compose up -d