# Use Docker Compose to build and run services
FROM docker/compose:latest

# Copy the docker-compose.yml file
COPY docker-compose.yml /app/docker-compose.yml

# Set the working directory
WORKDIR /app

# Run Docker Compose
CMD ["up"]
