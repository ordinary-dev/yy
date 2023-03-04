# YY

Modern website for a great agency.
![Screenshot](public/screenshot-1.webp)

## Getting Started

Run the development server:

```bash
docker-compose up --build
```

Open [localhost:3000](http://localhost:3000) with your browser to see the result.

Build the production server:

```bash
docker build -f docker/prod.Dockerfile .
```

## Running in production

Create a docker-compose file with the following content:

```yml
services:
  postgres:
    image: postgres
    volumes:
      - yy-postgres:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=username
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=yydb
    restart: unless-stopped

  yy:
    image: ghcr.io/ordinary-dev/yy
    volumes:
      - yy-photos:/app/photos
    ports:
      - 3000:3000
    environment:
      - DATABASE_URL=postgresql://username:password@postgres:5432/yydb?schema=public
    depends_on:
      - postgres
    restart: unless-stopped

volumes:
  yy-postgres:
  yy-photos:
```

## Authors

- Ivan Reshetnikov <ordinarydev@protonmail.com>
