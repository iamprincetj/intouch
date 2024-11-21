
FROM docker/compose:latest

# Set working directory
WORKDIR /app

# Copy docker-compose file
COPY docker-compose.yml /app/docker-compose.yml


# Build and up docker-compose
CMD ["docker-compose", "up", "-d"]
