# Use official Node.js Alpine image
FROM node:16-alpine as build

# NodeJS app lives here
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Install dependencies
COPY quai-antiqueapi/package.json quai-antiqueapi/package-lock.json ./
RUN npm install --production=false && npm cache clean --force

# Copy only necessary files
COPY quai-antiqueapi/src ./src
COPY quai-antiqueapi/public ./public
COPY quai-antiqueapi/tsconfig.json ./

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

# Expose port 8080
EXPOSE 8080

# Define healthcheck
HEALTHCHECK --interval=30s --timeout=3s CMD curl --fail http://localhost:8080/health || exit 1

# Start the server by default, this can be overwritten at runtime
CMD [ "npm", "run", "start" ]
