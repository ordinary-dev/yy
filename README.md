# YY

Modern website for a great agency.
![Screenshot](public/screenshot-1.webp)

## Getting Started

Run the development server:

```bash
podman-compose up --build
```

Open [localhost:3000](http://localhost:3000) with your browser to see the result.

Build the production server:

```bash
podman build -f docker/prod.Dockerfile .
```

Note: you can replace `podman` with `sudo docker`.

## Running in production

Create a docker-compose file with the following content:

```yml
services:
    yy:
        image: ghcr.io/alt-web/yy
        volumes:
            - yy-photos:/app/photos
        restart: unless-stopped
        ports:
            - 3000:3000
        depends_on:
            - postgres
        environment:
            - DATABASE_URL=postgresql://username:password@postgres:5432/yydb?schema=public

    postgres:
        image: postgres
        volumes:
            - yy-postgres-prod:/var/lib/postgresql/data
        environment:
            - POSTGRES_USER=username
            - POSTGRES_PASSWORD=password
            - POSTGRES_DB=yydb
        restart: unless-stopped

volumes:
    yy-postgres-prod:
    yy-photos:
```

## Authors

-   Ivan Reshetnikov <ordinarydev@protonmail.com>
