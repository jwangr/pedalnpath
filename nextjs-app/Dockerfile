# Step 1: Use official Node.js LTS image
FROM node:20-alpine AS builder

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm ci

# Step 5: Copy the rest of the app
COPY . .

# Generate Prisma client (for Linux)
RUN npx prisma generate

# Step 6: Build the Next.js app
RUN npm run build

# --- Production image ---
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only production files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose the default Next.js port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
