# Northstar — Enterprise React + TypeScript Starter

A runnable enterprise-style React application built with:

- React 18 + TypeScript + Vite
- Ant Design 5
- React Router
- Axios
- TanStack Query
- React Hook Form + Zod
- Zustand

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open the URL printed by Vite (normally http://localhost:5173).

The project defaults to `VITE_DATA_MODE=mock`. The mock employee API stores records in browser `localStorage`, so create/edit/delete operations persist after refresh. Use the demo role selector in the top-right to see different UI permissions.

## Demo access

No login is required in this starter. The role selector changes the current demo identity:

- **Admin** — view, create, edit and delete employees
- **Manager** — view, create and edit employees
- **Employee** — view employees only

This is a UI demonstration, not production authentication. In production, derive identity and permissions from a trusted server session/token and enforce authorization on every backend endpoint.

## Connect a REST backend

1. Set `.env`:
   ```env
   VITE_DATA_MODE=rest
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
2. Implement the API contract below in your .NET, Java or Node backend.
3. Restart Vite after changing environment variables.

### Employee API contract

| Method | Path | Purpose |
|---|---|---|
| GET | `/employees?page=1&pageSize=10&search=&department=&status=&sortBy=name&sortOrder=asc` | List employees |
| GET | `/employees/:id` | Employee detail |
| POST | `/employees` | Create employee |
| PUT | `/employees/:id` | Update employee |
| DELETE | `/employees/:id` | Delete employee |

List response:

```json
{
  "items": [
    {
      "id": 1,
      "name": "Ava Patel",
      "email": "ava.patel@example.com",
      "department": "Engineering",
      "designation": "Frontend Engineer",
      "status": "Active",
      "joinedOn": "2023-04-10"
    }
  ],
  "totalCount": 1,
  "page": 1,
  "pageSize": 10
}
```

Create/update request body:

```json
{
  "name": "Ava Patel",
  "email": "ava.patel@example.com",
  "department": "Engineering",
  "designation": "Frontend Engineer",
  "status": "Active",
  "joinedOn": "2023-04-10"
}
```

The REST mode assumes the backend returns the response shapes above. Update `src/features/employees/services/employeeApi.ts` if your API uses a different envelope.

### Authentication notes

`src/services/httpClient.ts` is the shared Axios client. It is configured with `withCredentials: true` for cookie-based sessions. Adapt this to your organization's OAuth/OIDC flow, CSRF policy and token refresh strategy. Do not store sensitive access tokens in localStorage. Configure CORS and secure, HttpOnly, SameSite cookies on the backend as appropriate.

## Useful scripts

```bash
npm run dev       # development server
npm run typecheck # TypeScript check
npm run build     # production build
npm run preview   # preview production build
```

## GitHub

Create an empty repository on GitHub, then run:

```bash
git init
git add .
git commit -m "Initial enterprise React TypeScript starter"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Do not commit `.env` files containing secrets. `.env.example` is safe to commit.

## Architecture

```text
src/
  app/                 app providers and route configuration
  components/common/   reusable table, page header, permission guard
  features/employees/  employee feature (types, schema, API, hooks, page)
  layouts/             authenticated application shell
  pages/               dashboard and not-found pages
  services/            Axios client
  store/               Zustand auth/demo identity store
  types/               shared API and auth types
  styles/              global styles
```
