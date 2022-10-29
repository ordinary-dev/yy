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
podman build -f docker/docker-prod.yml .
```

Note: you can replace `podman` with `sudo docker`.

## Authors

-   Ivan Reshetnikov <ordinarydev@protonmail.com>
