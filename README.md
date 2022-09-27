# YY

## Configuration
Create `.env` file to change settings
```env
ADMIN_LOGIN="yy"
ADMIN_PASSWORD="123456"
# Must be at least 30 characters long
COOKIE_PASS="1234567890-1234567890-1234567890"
DATABASE_URL="postgresql://user:password@postgres:5432/db?schema=public"
```

## Getting Started

Run the development server:

```bash
sudo docker-compose -f docker/docker-dev.yml --project-directory . up --build
```

Run the production server:

```bash
sudo docker-compose -f docker/docker-prod.yml --project-directory . up --build
```

Open [http://localhost:3000](localhost:3000) with your browser to see the result.

## Authors
- Ivan Reshetnikov <ordinarydev@protonmail.com>
