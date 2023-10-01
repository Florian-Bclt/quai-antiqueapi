# Use official Node.js Alpine image
FROM node:16-alpine as build

# NodeJS app lives here
WORKDIR /src

# Install dependencies
COPY package*.json ./
COPY tsconfig.json .

# Install build dependencies
RUN apk add --no-cache python3 make g++
RUN npm install -g @nestjs/cli
RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 3000

# Start the server by default, this can be overwritten at runtime
CMD [ "npm", "run", "start:prod" ]
