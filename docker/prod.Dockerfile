FROM node:lts
WORKDIR /app

# Install deps
COPY package.json package-lock.json ./
RUN npm install

# Build project
COPY . .
RUN npx prisma generate
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
RUN npm run build

EXPOSE 3000

CMD npx prisma migrate deploy && npm start
