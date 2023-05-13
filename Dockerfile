# Use official Node.js Alpine image
FROM node:16-alpine as build

# NodeJS app lives here
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++
RUN npm install -g @nestjs/cli


# Install dependencies
COPY package.json package-lock.json ./
COPY tsconfig.json .
RUN npm install --production=false && npm cache clean --force

# Add NestJS to PATH
ENV PATH="${PATH}:/app/node_modules/.bin"

# Build application
RUN npm run build

# Final stage for app image
FROM node:16-alpine

# NodeJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Start the server by default, this can be overwritten at runtime
CMD [ "npm", "node", "node_modules/.bin/nest", "start" ]
