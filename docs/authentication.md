# Authentication

Run the API on port 3000 and the UI on port 3001. Run `npm install` (updates package-lock.json), then `npm run build` and `npm run dev` in the UI. Vite proxies `/api` to localhost:3000. For deployment configure VITE_API_URL with the API base including /api, or serve /api via a reverse proxy.

Login uses email/password; register uses username/email/password/firstName/lastName. The API currently issues a one-day JWT and has no refresh, logout or /me endpoint. The UI intentionally stores the session in memory only; reloading requires login. Logout clears client state, not server-side JWT validity. Document and insurance fields remain visible but are not persisted by the current API. No visual redesign. Before merge, regenerate and commit the npm lockfile and run build and real API smoke tests.
