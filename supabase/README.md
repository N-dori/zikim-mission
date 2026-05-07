# Supabase setup

## Running `init.sql`

1. Open the [Supabase Dashboard](https://supabase.com/dashboard) and select project `zscsixqcdrxesuhugfpe`.
2. Go to **SQL Editor** → **New query**.
3. Paste the contents of [`init.sql`](./init.sql) and click **Run**.
4. Verify the `users` and `rooms` tables exist under **Table Editor**.

`init.sql` is idempotent — `create table if not exists` and `alter table ... enable row level security` are safe to re-run.

## Frontend env vars

The Next.js app no longer talks to Supabase directly — all DB access goes through the backend Express API. The only frontend env vars related to auth are:

| Variable | Where used | Notes |
|---|---|---|
| `NEXTAUTH_SECRET` | `src/app/api/auth/[...nextauth]/authOptions.ts` | **Must NOT have `NEXT_PUBLIC_` prefix** — anyone can forge JWTs if it leaks. Rotate any value that was ever bundled with that prefix. |
| `NEXTAUTH_URL` | NextAuth runtime | Base URL of the app, e.g. `http://localhost:3000`. |
| `NEXT_PUBLIC_API_BASE_URL` | `src/app/libs/apiClient.ts`, `authOptions.ts` | URL of the Express backend. |

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are **only** needed by the backend (`zikim-mission-api`), not by the Next.js app.

## RLS

`init.sql` enables RLS on `users` and `rooms` with **no policies** (deny-by-default). The backend uses the service role key which bypasses RLS, so this only matters as defense-in-depth.

To verify: in **Table Editor**, switch the role selector at the top from `service_role` to `anon` — the rows disappear.

## Production hosting note

The custom `server.js` + Socket.IO does **not** run on Vercel serverless. Group trivia works in `npm run dev` locally. For production the Node server needs a long-running host (Render / Railway / Fly / VM) and the prod URL in [`src/app/utils/utils.ts`](../src/app/utils/utils.ts) must point at it.
