# Use official Node.js Alpine image
FROM node:16-alpine as build

# NodeJS app lives here
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++
RUN npm install -g @nestjs/cli

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --production=false && npm cache clean --force

# Copy only necessary files
COPY src ./src
COPY public ./public
COPY tsconfig.json ./

# Build application
RUN npm run build

# Final stage for app image
FROM node:16-alpine

# NodeJS app lives here
WORKDIR /app

# Copy built application
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json

# Set production environment
ENV NODE_ENV=production

# Start the server by default, this can be overwritten at runtime
CMD [ "npm", "run", "start" ]
