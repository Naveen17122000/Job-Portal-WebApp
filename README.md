# TalentBridge Job Portal

TalentBridge is a full-stack job portal application built with **Django REST Framework** and **React.js**. The platform connects job seekers, recruiters, and admins through a role-based hiring workflow.

The project uses a separate backend and frontend architecture. The backend exposes REST APIs using Django REST Framework, and the frontend consumes those APIs using React.js, Vite, and Axios.

---

## Project Overview

TalentBridge supports three main user roles:

- **Job Seekers** can create profiles, browse jobs, apply for jobs, and track application status.
- **Recruiters** can create company profiles, post jobs, manage listings, and review candidates.
- **Admins** can manage users, monitor platform activity, deactivate users, and view analytics.

The application uses **JWT authentication** and **role-based access control** to make sure each user can access only the features allowed for their role.

---

## Technology Stack

### Backend

| Technology | Purpose |
|---|---|
| Python | Backend programming language |
| Django | Backend web framework |
| Django REST Framework | REST API development |
| Simple JWT | Access and refresh token authentication |
| SQLite | Local development database |
| Django CORS Headers | Frontend-backend communication |
| Django Admin | Admin panel and data management |

### Frontend

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| Vite | Fast frontend development server |
| JavaScript | Frontend programming language |
| Axios | API communication with backend |
| React Router | Page navigation and protected routes |
| CSS | Styling and layout |

---

## Architecture Pattern

TalentBridge follows a full-stack client-server architecture.

```text
React Frontend
     |
     | Axios HTTP Requests
     |
Django REST Framework API
     |
     | ORM Queries
     |
SQLite Database
```

### Backend Responsibilities

The backend handles:

- User authentication
- Role-based permissions
- Job seeker profile management
- Company profile management
- Job posting and filtering
- Application workflow
- Admin analytics
- API response formatting
- Database operations

### Frontend Responsibilities

The frontend handles:

- Login and registration screens
- Role-based dashboards
- Job listing pages
- Job application forms
- Recruiter job management screens
- Admin analytics screens
- Protected routes
- API integration using Axios

---

## Project Structure

```text
backend/
  config/              Django project settings and root URL configuration
  users/               Custom user model, authentication, seeker profiles, analytics
  companies/           Recruiter company profile management
  jobs/                Job listing, search, filters, active/inactive status
  applications/        Job application workflow and status transitions
  common/              Pagination, response helpers, permissions, exceptions
  media/               Uploaded resume files during local development

frontend/
  src/components/      Layout components and reusable UI elements
  src/hooks/           Authentication and API resource hooks
  src/pages/           Role-based application screens
  src/services/        Axios client and authentication services
  src/routes/          Protected routes and navigation handling

docs/
  API.md               API endpoint reference
  AUTH_FLOW.md         JWT authentication and RBAC flow

README.md              Project documentation
.gitignore             Ignored local files and folders
```

---

## Application Workflow

### 1. User Registration and Login

```text
Job Seeker / Recruiter / Admin
        |
        v
Register Account
        |
        v
Login
        |
        v
Receive JWT Access Token and Refresh Token
        |
        v
Redirect to Role-Based Dashboard
```

The backend validates user credentials and returns JWT tokens. The frontend stores the tokens and uses them for authenticated API requests.

---

### 2. Job Seeker Workflow

```text
Job Seeker Login
        |
        v
Create / Update Profile
        |
        v
Browse Job Listings
        |
        v
Filter Jobs by Category, Location, Salary
        |
        v
Apply for Job
        |
        v
Track Application Status
```

Job seekers can manage their profile, add skills, experience, portfolio URL, upload resumes, and apply for available jobs.

---

### 3. Recruiter Workflow

```text
Recruiter Login
        |
        v
Create Company Profile
        |
        v
Post Job
        |
        v
Manage Active / Inactive Jobs
        |
        v
Review Candidate Applications
        |
        v
Update Application Status
```

Recruiters can manage company details, create job openings, activate or deactivate listings, and review candidate applications.

---

### 4. Admin Workflow

```text
Admin Login
        |
        v
View Users
        |
        v
Monitor Platform Activity
        |
        v
Deactivate Users if Required
        |
        v
View Analytics Dashboard
```

Admins have visibility into platform users, user roles, platform activity, and analytics.

---

## Core Features

- JWT authentication with access and refresh tokens
- Role-based access control for seekers, recruiters, and admins
- Job seeker profile management
- Resume upload support for applications
- Recruiter company profile setup
- Job posting and job listing management
- Active and inactive job status handling
- Searchable job listings with category, location, and salary filters
- Application workflow with candidate status tracking
- Admin user management and deactivation support
- Platform analytics for admin users
- Paginated API responses using Django REST Framework
- Protected frontend routes based on user role
- SQLite database for local development

---

## Backend Setup

Go to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate the virtual environment:

```bash
.venv\Scripts\activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Create the environment file:

```bash
copy .env.example .env
```

Apply database migrations:

```bash
python manage.py migrate
```

Create a superuser:

```bash
python manage.py createsuperuser
```

Run the backend server:

```bash
python manage.py runserver
```

The backend runs at:

```text
http://127.0.0.1:8000/
```

The API base URL is:

```text
http://127.0.0.1:8000/api/
```

The Django admin panel is available at:

```text
http://127.0.0.1:8000/admin/
```

---

## Frontend Setup

Go to the frontend folder:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Create the frontend environment file:

```bash
copy .env.example .env
```

Run the React development server:

```bash
npm run dev
```

The frontend runs at:

```text
http://localhost:5173/
```

---

## Environment Variables

### Backend Environment Variables

Backend variables are stored in:

```text
backend/.env
```

Required variables:

```env
DJANGO_SECRET_KEY=your-secret-key
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
ACCESS_TOKEN_LIFETIME_MINUTES=60
REFRESH_TOKEN_LIFETIME_DAYS=7
```

### Frontend Environment Variables

Frontend variables are stored in:

```text
frontend/.env
```

Required variable:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/
```

---

## API Workflow

The frontend communicates with the backend using Axios.

```text
React Component
      |
      v
Axios Service
      |
      v
Django REST API Endpoint
      |
      v
Serializer Validation
      |
      v
Database Operation
      |
      v
JSON Response
      |
      v
React UI Update
```

Example login flow:

```text
User logs in
    |
Frontend sends username and password
    |
Backend validates user
    |
Backend returns access and refresh tokens
    |
Frontend stores token
    |
User is redirected based on role
```

---

## Common API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register/` | Register a new user |
| POST | `/api/auth/token/` | Login and get JWT token |
| POST | `/api/auth/token/refresh/` | Refresh JWT token |
| GET | `/api/users/` | List users |
| GET | `/api/profiles/` | Manage seeker profiles |
| GET | `/api/companies/` | List company profiles |
| GET | `/api/jobs/` | List job postings |
| POST | `/api/jobs/` | Create job posting |
| GET | `/api/applications/` | List applications |
| POST | `/api/applications/` | Apply for job |
| GET | `/api/analytics/` | Admin analytics |

---

## Local Development Process

To run the full application locally, use two terminals.

### Terminal 1: Backend

```bash
cd backend
.venv\Scripts\activate
python manage.py runserver
```

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173/
```

The React frontend communicates with the Django backend at:

```text
http://127.0.0.1:8000/api/
```

---

## Git Ignore Policy

The project should not push local development files to GitHub.

Ignored files include:

```text
.env
.venv/
node_modules/
db.sqlite3
backend/media/
frontend/.npm-cache/
__pycache__/
```

Use `.env.example` files to share required environment variable names without exposing real secrets.

---

## Documentation

Additional documentation is available in the `docs/` folder:

- [API Reference](docs/API.md)
- [Authentication Flow](docs/AUTH_FLOW.md)

---

## Project Status

TalentBridge is currently a local full-stack development project. It demonstrates a practical job portal workflow using Django REST Framework for the backend and React.js for the frontend.

The project can be extended with:

- PostgreSQL database support
- Email verification
- Password reset flow
- Resume parsing
- Job recommendation system
- Recruiter subscription plans
- Production deployment using Render, Railway, Vercel, or AWS
