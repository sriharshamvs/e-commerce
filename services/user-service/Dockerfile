# Use the official Node.js runtime as the base image
FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy the current directory contents into the container
COPY . .

# Make the wait-for-it.sh script executable
RUN chmod +x wait-for-it.sh

# Install the application dependencies
RUN npm install

# Expose the application port
EXPOSE 3000

# Use the wait-for-it.sh script to wait for the database, then start the application
CMD ["./wait-for-it.sh", "user-db:5432", "--", "node", "server.js"]
