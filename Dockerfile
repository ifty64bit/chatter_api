# Stage 1: Build Stage
FROM node:20.18-bullseye AS builder

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the project using esbuild
RUN npm run esbuild

COPY /.env /app/.env

# Stage 2: Production Image
FROM gcr.io/distroless/nodejs22-debian12:latest

WORKDIR /app

# Set environment variable for production
ENV NODE_ENV=production

# Copy the build output and Prisma client from the builder stage
COPY --from=builder /app/.env /app/.env
COPY --from=builder /app/build /app/build
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma

# Expose the application port
EXPOSE 3000

# Start the application
CMD [ "build/index.js"]