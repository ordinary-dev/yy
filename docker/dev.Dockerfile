FROM node:lts
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY prisma ./
RUN npx prisma generate

ENV NEXT_TELEMETRY_DISABLED 1
EXPOSE 3000
HEALTHCHECK --start-period=30s --timeout=5s CMD curl --fail http://localhost:3000/api/health

COPY next-env.d.ts tsconfig.json ./

ENTRYPOINT npx prisma migrate deploy && exec npm run dev
