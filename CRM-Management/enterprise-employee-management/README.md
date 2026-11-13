# PeopleOS — Enterprise Employee Management

A responsive React + TypeScript employee directory with Redux Toolkit state management, Context API notifications, and a REST API.

## Features

- REST-backed employee list (11 seeded employees)
- Redux Toolkit async thunks for fetch, create, update, and delete
- Search across employee name, email, ID, department, title, and location
- Department and status filters
- Sortable columns and client-side pagination
- Validated add/edit form (required fields, email format, positive salary)
- Confirm-before-delete workflow
- CSV export
- Loading, error, retry, and success/error toast states
- Responsive enterprise dashboard layout
- Context API for app-wide notifications

## Requirements

- Node.js 18.18+ (Node 20+ recommended)
- npm

## Run locally

Open two terminals in this project directory.

**Terminal 1 — REST API**
```bash
npm install
npm run api
```
The JSON Server API runs at `http://localhost:3001` and reads/writes `db.json`.

**Terminal 2 — React app**
```bash
npm run dev
```
Open the Vite URL printed in the terminal (normally `http://localhost:5173`).

To create a production build:
```bash
npm run build
npm run preview
```

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/employees` | List employees |
| POST | `/employees` | Create employee |
| PATCH | `/employees/:id` | Update employee |
| DELETE | `/employees/:id` | Delete employee |

Set `VITE_API_URL` in a `.env` file to point to a different REST API. The API should return the `Employee` shape defined in `src/types/employee.ts`.

## Architecture

```text
src/
  app/          Redux store and typed hooks
  components/   Employee form and data table
  context/      Context API notification provider
  features/     Employee Redux slice and async thunks
  pages/        Employee directory page
  services/     REST API client
  types/        Shared TypeScript domain types
```

### State ownership

- **Redux Toolkit:** server-owned employee records, request/loading state, and CRUD lifecycle.
- **Context API:** cross-page UI notifications.
- **Component state:** search/filter values, table sort/page, modal visibility, and form values.

### Production hardening notes

For a production deployment, connect the API to your authenticated backend, enforce authorization and validation server-side, use HTTPS, add audit logging, and replace the demo salary field with your organization’s access-controlled compensation policy. The included JSON Server is a local development API, not a production database.
