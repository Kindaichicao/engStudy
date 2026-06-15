# Production image for the TechEnglish server.
# Single-stage on debian-slim — keeps better-sqlite3 native bindings happy
# (Alpine + musl tends to fight with prebuilt binaries).

FROM node:22-bookworm-slim

WORKDIR /app

# Install build deps for better-sqlite3, install npm deps, then drop them.
COPY package*.json ./
RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 make g++ ca-certificates && \
    npm ci --omit=dev --no-audit --no-fund && \
    apt-get purge -y --auto-remove python3 make g++ && \
    rm -rf /var/lib/apt/lists/* /root/.npm

# Copy app source.
COPY . .

# Fly mounts the persistent volume at /data; default to that path.
ENV NODE_ENV=production \
    PORT=8080 \
    PROGRESS_DB_PATH=/data/progress.db

EXPOSE 8080

# Make sure /data exists when running outside Fly (e.g. local docker run).
RUN mkdir -p /data

CMD ["node", "server.js"]
