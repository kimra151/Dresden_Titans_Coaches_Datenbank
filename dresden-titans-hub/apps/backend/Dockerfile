# ==========================================
# STAGE 1: Base
# ==========================================
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=4096"

# ==========================================
# STAGE 2: Prune
# ==========================================
FROM base AS pruner
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@dresden-titans/backend --docker

# ==========================================
# STAGE 3: Dependencies
# ==========================================
FROM base AS deps
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# ==========================================
# STAGE 4: Builder
# ==========================================
FROM deps AS builder
COPY --from=pruner /app/out/full/ .
RUN npx prisma generate --schema=packages/database/prisma/schema.prisma
RUN pnpm --filter @dresden-titans/backend... build

# ==========================================
# STAGE 5: Production
# ==========================================
FROM node:22-alpine AS production
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
RUN apk add --no-cache wget curl && \
    addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile --prod && pnpm store prune

COPY --from=builder --chown=nestjs:nodejs /app/out/full/apps/backend/dist ./apps/backend/dist
COPY --from=builder --chown=nestjs:nodejs /app/out/full/packages ./packages

USER nestjs
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "apps/backend/dist/main.js"]

# ==========================================
# STAGE 6: Development (LOKALES SETUP)
# ==========================================
FROM base AS development

# Erzwingt den Dev-Modus, damit Next/Nest-CLIs garantiert installiert werden
ENV NODE_ENV=development

COPY . .

# DER KILL-SWITCH: Löscht alle lokalen Mac/Windows-Dateien, die den Build stören könnten
RUN rm -rf node_modules apps/*/node_modules packages/*/node_modules

# Saubere Linux-Installation (ohne store prune für maximale Stabilität)
RUN pnpm install

RUN npx prisma generate --schema=packages/database/prisma/schema.prisma

EXPOSE 3000 9229
CMD ["pnpm", "--filter", "@dresden-titans/backend", "exec", "nest", "start", "--debug", "--watch"]