# ==========================================
# STAGE 1: Base
# ==========================================
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@11.10.0 --activate
WORKDIR /app

# ==========================================
# STAGE 2: Dependencies
# ==========================================
FROM base AS deps
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/database/package.json ./packages/database/
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/
COPY packages/config/package.json ./packages/config/

RUN pnpm install --frozen-lockfile

# ==========================================
# STAGE 3: Development
# ==========================================
FROM deps AS development
COPY . .
EXPOSE 3000
CMD ["pnpm", "--filter", "@dresden-titans/frontend", "dev"]

# ==========================================
# STAGE 4: Builder
# ==========================================
FROM deps AS builder
COPY . .

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}

# Prisma Client generieren (für shared types)
RUN pnpm --filter @dresden-titans/database db:generate
RUN pnpm --filter @dresden-titans/frontend build

# ==========================================
# STAGE 5: Production (Next.js standalone)
# ==========================================
FROM node:22-alpine AS production
RUN apk add --no-cache wget curl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app

# Standalone Output kopieren (Next.js optimiert!)
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public

USER nextjs
EXPOSE 3000
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
CMD ["node", "apps/frontend/server.js"]
