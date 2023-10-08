# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend files into the container
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port that your React app listens on (default is 3000)
EXPOSE 3000

# Define the command to start your React app when the container starts
CMD ["npm", "start"]
