FROM node:22-alpine AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV PNPM_HOME=/pnpm
ENV PATH="${PNPM_HOME}:${PATH}"

RUN corepack enable

FROM base AS build

COPY . .

RUN if [ -f package.json ]; then pnpm install --frozen-lockfile && pnpm build; else echo "No package.json found; production build is a no-op until the Next.js app exists."; fi

FROM base AS runtime

ENV NODE_ENV=production

COPY --from=build /app /app

EXPOSE 3000

CMD ["sh", "-lc", "if [ -f package.json ]; then pnpm start; else echo 'No built Next.js app yet.' && tail -f /dev/null; fi"]
