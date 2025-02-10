# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Load secrets and persist them in ENV
RUN --mount=type=secret,id=CLERK_PUBLISHABLE_KEY \
    --mount=type=secret,id=CLERK_SECRET_KEY \
    echo "CLERK_PUBLISHABLE_KEY=$(cat /run/secrets/CLERK_PUBLISHABLE_KEY)" >> /etc/environment && \
    echo "CLERK_SECRET_KEY=$(cat /run/secrets/CLERK_SECRET_KEY)" >> /etc/environment

# Copy the rest of the application
COPY . .

# Source environment variables and build
RUN source /etc/environment && npm run build

# -- Production Stage --
FROM node:18-alpine AS runner
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables for runtime
# ENV NODE_ENV=production

# Expose the port Next.js runs on
EXPOSE 3000

# Run the application
CMD ["node", "node_modules/.bin/next", "start"]
