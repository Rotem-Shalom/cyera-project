# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Expose the port the app runs on 
EXPOSE 3003

# Run the app with ts-node-dev
CMD ["npx", "ts-node-dev", "src/index.ts"]
