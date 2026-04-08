# Club Hub

Club Hub is a Next.js platform for technical clubs to manage members, challenges, leaderboards, project showcases, and admin workflows.

## Stack

- Next.js App Router
- Tailwind CSS
- Auth.js
- Prisma ORM
- SQLite for local demo

## Local development

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo accounts

These are intended for local review and demo environments only.

- Admin: `admin@clubhub.dev` / `clubhub-admin`
- Member: `member@clubhub.dev` / `clubhub-member`

Disable them in production by setting:

```bash
DEMO_AUTH_ENABLED="false"
```

## Required production environment variables

```bash
AUTH_SECRET="your-long-random-secret"
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
DATABASE_URL=""
DEMO_AUTH_ENABLED="false"
```

## Production notes

- Use a managed PostgreSQL database for production deployment.
- Do not use the local SQLite file in serverless production environments.
- Keep demo auth disabled in production.
- Configure real Google and GitHub OAuth credentials before launch.
- Run `npm run build` before deployment to verify the app.

## Deploy

Recommended deployment target: Vercel with a managed database.

```bash
npm run build
npx vercel
```
