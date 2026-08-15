FROM node:26-alpine3.23 AS base

ARG NPM_VERSION=11.18.0
ARG NPM_BRACE_EXPANSION_VERSION=5.0.8
ARG PNPM_VERSION=11.9.0

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV PNPM_HOME=/pnpm
ENV PATH="${PNPM_HOME}:${PATH}"

RUN npm install -g npm@${NPM_VERSION} \
  && npm pack brace-expansion@${NPM_BRACE_EXPANSION_VERSION} --pack-destination /tmp \
  && rm -rf /usr/local/lib/node_modules/npm/node_modules/brace-expansion \
  && mkdir -p /usr/local/lib/node_modules/npm/node_modules/brace-expansion \
  && tar -xzf /tmp/brace-expansion-${NPM_BRACE_EXPANSION_VERSION}.tgz -C /usr/local/lib/node_modules/npm/node_modules/brace-expansion --strip-components=1 \
  && rm /tmp/brace-expansion-${NPM_BRACE_EXPANSION_VERSION}.tgz \
  && npm install -g pnpm@${PNPM_VERSION}

FROM base AS build

ARG BUILD_DB_PROTOCOL=postgresql
ARG BUILD_DB_PART_A=placeholder
ARG BUILD_DB_PART_B=placeholder
ARG BUILD_DB_HOST=db
ARG BUILD_DB_PORT=5432
ARG BUILD_DB_NAME=placeholder

COPY . .

RUN if [ -f package.json ]; then \
    BUILD_DB_CONN="${BUILD_DB_PROTOCOL}://${BUILD_DB_PART_A}:${BUILD_DB_PART_B}@${BUILD_DB_HOST}:${BUILD_DB_PORT}/${BUILD_DB_NAME}" \
    && export DATABASE_URL="${BUILD_DB_CONN}" \
    && pnpm install --frozen-lockfile \
    && pnpm build \
    && pnpm prune --prod --ignore-scripts; \
  else \
    echo "No package.json found; production build is a no-op until the Next.js app exists."; \
  fi

FROM base AS runtime

ENV NODE_ENV=production

COPY --from=build /app /app

EXPOSE 3000

CMD ["sh", "-lc", "if [ -f package.json ]; then pnpm start; else echo 'No built Next.js app yet.' && tail -f /dev/null; fi"]
