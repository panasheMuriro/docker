# Use official Node.js LTS image as base
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and app.js into container
COPY package.json app.js ./

# Install dependencies (none in this simple case, but still runs npm install)
RUN npm install

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
