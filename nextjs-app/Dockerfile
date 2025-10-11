# Step 1: Use official Node.js LTS image
FROM node:20-alpine AS builder

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# 👇 Also copy Prisma schema early (needed for `prisma generate`)
COPY prisma ./prisma/

# Step 4: Install dependencies
RUN npm ci

# Step 5: Copy the rest of the app
COPY . .

# Step 6: Generate Prisma client for Linux
RUN npx prisma generate

# Step 7: Build the Next.js app
RUN npm run build

# --- Production image ---
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only necessary build outputs and runtime files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Optional: copy src if needed for runtime (only if you import local files at runtime)
COPY --from=builder /app/src ./src

# Expose port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
