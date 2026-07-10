# ==========================================
# STAGE 1: Base
# ==========================================
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=4096"

# ==========================================
# STAGE 2: Prune
# ==========================================
FROM base AS pruner
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@dresden-titans/frontend --docker

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

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}

RUN npx prisma generate --schema=packages/database/prisma/schema.prisma
RUN pnpm --filter @dresden-titans/frontend build

# ==========================================
# STAGE 5: Production
# ==========================================
FROM node:22-alpine AS production
RUN apk add --no-cache wget curl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app

COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public

USER nextjs
EXPOSE 3000
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
CMD ["node", "apps/frontend/server.js"]

# ==========================================
# STAGE 6: Development (LOKALES SETUP)
# ==========================================
FROM base AS development

# Erzwingt den Dev-Modus
ENV NODE_ENV=development

COPY . .

# DER KILL-SWITCH: Löscht alle lokalen Mac/Windows-Dateien, die den Build stören könnten
RUN rm -rf node_modules apps/*/node_modules packages/*/node_modules

# Saubere Linux-Installation
RUN pnpm install

RUN npx prisma generate --schema=packages/database/prisma/schema.prisma

EXPOSE 3000
CMD ["pnpm", "--filter", "@dresden-titans/frontend", "exec", "next", "dev", "--port", "3000"]