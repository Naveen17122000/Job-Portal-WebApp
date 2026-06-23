# TalentBridge Job Portal

TalentBridge is a full-stack job portal built with Django REST Framework and React. It supports three roles: job seekers, recruiters, and admins, with role-based access control enforced by both API permissions and frontend route guards.

## Project Structure

```text
backend/
  config/              Django project settings and routes
  users/               Custom user model, seeker profiles, admin analytics
  companies/           Recruiter company profiles
  jobs/                Job listings, filters, active/inactive states
  applications/        Application workflow and status transitions
  common/              Pagination, response, permission, exception helpers
frontend/
  src/components/      Layout and reusable UI components
  src/hooks/           Auth and API resource hooks
  src/pages/           Role-aware application screens
  src/services/        Axios client and auth services
docs/
  API.md               Endpoint reference
  AUTH_FLOW.md         JWT and RBAC flow
```

## Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

The API runs at `http://localhost:8000/api/`. Uploaded resumes are stored under `backend/media/` in development.

## Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

The React app runs at `http://localhost:5173/`.

## Core Features

- JWT authentication with access and refresh tokens.
- Custom user roles: `seeker`, `recruiter`, `admin`.
- Job seeker profiles with skills, experience, portfolio URL, and resume upload field support.
- Searchable job listings with filters for category, location, and salary range.
- Recruiter company setup, job posting, active/inactive listing management, and candidate status review.
- Admin user deactivation, role visibility, and platform analytics.
- Pagination on DRF list endpoints through a consistent envelope.
- SQLite schema with indexes on role, job category, location, posting date, status, and application status.

## Environment Variables

Backend variables live in `backend/.env`:

- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG`
- `DJANGO_ALLOWED_HOSTS`
- `CORS_ALLOWED_ORIGINS`
- `ACCESS_TOKEN_LIFETIME_MINUTES`
- `REFRESH_TOKEN_LIFETIME_DAYS`

Frontend variables live in `frontend/.env`:

- `VITE_API_BASE_URL`

## Documentation

- [API Reference](docs/API.md)
- [Authentication Flow](docs/AUTH_FLOW.md)
