FROM node:lts
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1
EXPOSE 3000

CMD npm install && npx prisma generate && npx prisma migrate deploy && npm run dev
