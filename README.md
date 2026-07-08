# Coach Zone

> **Work in progress — rebuilding into a full product.**

Coach Zone is a web app for coaches: build training sessions from a reusable
exercise library, export them to PDF, and share them with your team. The
longer-term vision also covers full team and player management, where
coaches can affect their players by adding their strengths and weaknesses,
allowing progress to be tracked over time, alongside a calendar and
stopwatch for running sessions.

This repository is being rebuilt from the ground up as a public product,
starting from a university thesis project. Backend integration (Supabase)
is coming in a follow-up phase.

## Tech stack

- [Next.js 15](https://nextjs.org) - App Router, TypeScript (strict mode)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com) - Postgres, Auth, Storage (coming soon)
- Deployed on [Vercel](https://vercel.com)

## Getting started

Requires [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Scripts

| Script           | Purpose                                   |
| ---------------- | ----------------------------------------- |
| `pnpm dev`       | Start the development server              |
| `pnpm build`     | Production build                          |
| `pnpm lint`      | Run ESLint                                |
| `pnpm typecheck` | Run the TypeScript compiler in check mode |
| `pnpm format`    | Format the codebase with Prettier         |

## History

The original thesis implementation (Next.js 10 + Keystone.js + MongoDB) is
preserved for reference on the [`legacy`](../../tree/legacy) branch.

## License

[MIT](./LICENSE)
