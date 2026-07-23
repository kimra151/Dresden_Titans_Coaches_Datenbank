# 1. Basis-Image (winziges Linux)
FROM node:22-alpine AS base
# WICHTIG FÜR PRISMA: Alpine Linux braucht openssl für die Prisma Query Engine!
RUN apk add --no-cache libc6-compat openssl

# 2. Abhängigkeiten installieren & Prisma generieren
FROM base AS deps
WORKDIR /app
# Zuerst nur die package-Dateien und das Prisma-Schema kopieren (für besseres Docker-Caching)
COPY package.json package-lock.json ./
COPY prisma ./prisma

# Clean Install für exakte Versionen
RUN npm ci
# WICHTIG: Prisma Client generieren, BEVOR Next.js baut
RUN npx prisma generate

# 3. App bauen
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js Telemetrie abschalten (spart Zeit beim Bauen)
ENV NEXT_TELEMETRY_DISABLED=1

# App bauen (nutzt automatisch die "standalone" Konfiguration aus next.config.mjs)
RUN npm run build

# 4. Der finale, winzige Produktions-Container
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Hostname auf 0.0.0.0 setzen, damit der Container von außen erreichbar ist
ENV HOSTNAME="0.0.0.0"

# Sicherheit: Die App darf keine Root-Rechte auf dem Server haben
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Ordner-Rechte anpassen
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Nur die absolut notwendigen Dateien kopieren
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# App als eingeschränkter Nutzer starten
USER nextjs

EXPOSE 3000
ENV PORT=3000

# Next.js im Standalone-Modus starten
CMD ["node", "server.js"]