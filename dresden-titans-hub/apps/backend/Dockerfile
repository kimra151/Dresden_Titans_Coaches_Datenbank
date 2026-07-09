# ==========================================
# STAGE 1: Base (für alle Stages)
# ==========================================
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@11.10.0 --activate
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ==========================================
# STAGE 2: Dependencies (für Caching optimiert)
# ==========================================
FROM base AS deps
# Nur package.json Dateien kopieren (besseres Caching!)
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/database/package.json ./packages/database/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/

# Dependencies installieren
RUN pnpm install --frozen-lockfile --prod=false

# ==========================================
# STAGE 3: Development (mit Hot-Reload)
# ==========================================
FROM deps AS development
COPY . .
# Prisma Client generieren
RUN pnpm --filter @dresden-titans/database db:generate
EXPOSE 3000 9229
CMD ["pnpm", "--filter", "@dresden-titans/backend", "start:debug"]

# ==========================================
# STAGE 4: Builder (kompiliert TypeScript)
# ==========================================
FROM deps AS builder
COPY . .
RUN pnpm --filter @dresden-titans/database db:generate
RUN pnpm --filter @dresden-titans/backend... build

# ==========================================
# STAGE 5: Production (minimal, sicher)
# ==========================================
FROM node:22-alpine AS production
RUN corepack enable && corepack prepare pnpm@11.10.0 --activate
RUN apk add --no-cache wget curl && \
    addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

WORKDIR /app

# Nur Production-Dependencies
COPY --from=builder /app/package.json /app/pnpm-workspace.yaml ./
COPY --from=builder /app/apps/backend/package.json ./apps/backend/
COPY --from=builder /app/packages/database/package.json ./packages/database/
COPY --from=builder /app/packages/utils/package.json ./packages/utils/
COPY --from=builder /app/packages/config/package.json ./packages/config/

RUN pnpm install --frozen-lockfile --prod && pnpm store prune

# Kompilierten Code kopieren
COPY --from=builder --chown=nestjs:nodejs /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder --chown=nestjs:nodejs /app/packages/database ./packages/database
COPY --from=builder --chown=nestjs:nodejs /app/packages/utils ./packages/utils

USER nestjs
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "apps/backend/dist/main.js"]
