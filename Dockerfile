# Production image for the TechEnglish server.
# Pure-JS dependencies now (no native compile) → tiny image, fast build.

FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund && \
    rm -rf /root/.npm

COPY . .

ENV NODE_ENV=production \
    PORT=8080 \
    PROGRESS_DB_PATH=/data/progress.json

EXPOSE 8080

# Make sure /data exists at boot (Koyeb / Fly volumes may mount here).
RUN mkdir -p /data

CMD ["node", "server.js"]
