
FROM docker:latest

# Set working directory
WORKDIR /app

# Copy docker-compose file
COPY docker-compose.yml /app/docker-compose.yml

# Install dependencies
RUN pip install docker-compose

# Build and up docker-compose
CMD ["docker-compose", "up", "-d"]
