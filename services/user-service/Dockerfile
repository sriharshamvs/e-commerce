# Use the official Node.js runtime as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Install the application dependencies
# Copying these first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy only necessary directories and files into the container
COPY src/ ./src/
COPY scripts/ ./scripts/
COPY .env ./

# Make the wait-for-it.sh script executable
RUN chmod +x scripts/wait-for-it.sh

# Expose the application port
EXPOSE 3000

# Use the wait-for-it.sh script to wait for the database, then start the application
CMD ["./scripts/wait-for-it.sh", "user-db:5432", "--", "node", "src/server.js"]
