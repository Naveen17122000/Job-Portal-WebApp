# API Reference

Base URL: `http://localhost:8000/api`

All protected endpoints require:

```http
Authorization: Bearer <access_token>
```

Paginated list responses use this shape:

```json
{
  "success": true,
  "count": 25,
  "next": "http://localhost:8000/api/jobs/?page=2",
  "previous": null,
  "results": []
}
```

Error responses use this shape:

```json
{
  "success": false,
  "message": "Request failed.",
  "errors": {
    "field": ["Validation message"]
  }
}
```

## Auth

### Register

`POST /auth/register/`

```json
{
  "username": "maya",
  "email": "maya@example.com",
  "password": "strong-password",
  "first_name": "Maya",
  "last_name": "Rao",
  "role": "seeker",
  "phone": "+1-555-0100"
}
```

Response:

```json
{
  "success": true,
  "message": "Account created",
  "data": {
    "id": 1,
    "username": "maya",
    "email": "maya@example.com",
    "role": "seeker",
    "is_active": true
  }
}
```

### Login

`POST /auth/token/`

```json
{
  "username": "maya",
  "password": "strong-password"
}
```

Response:

```json
{
  "refresh": "<refresh_token>",
  "access": "<access_token>"
}
```

### Refresh

`POST /auth/token/refresh/`

```json
{
  "refresh": "<refresh_token>"
}
```

## Users

Admin only.

- `GET /users/`
- `GET /users/{id}/`
- `PATCH /users/{id}/`
- `DELETE /users/{id}/` deactivates the account instead of hard deleting it.

Update example:

```json
{
  "role": "recruiter",
  "is_active": false,
  "phone": "+1-555-0130"
}
```

## Profiles

- `GET /profiles/` seeker sees own profile; admin sees all.
- `POST /profiles/` seeker only.
- `PATCH /profiles/{id}/` seeker only for own profile.

```json
{
  "headline": "Frontend engineer",
  "location": "Remote",
  "skills": ["React", "Django", "SQL"],
  "experience_years": 4,
  "portfolio_url": "https://example.com"
}
```

## Companies

- `GET /companies/` recruiter sees own companies; admin sees all; seekers see verified companies.
- `POST /companies/` recruiter only.
- `PATCH /companies/{id}/` recruiter only for own company.

```json
{
  "name": "Northstar Labs",
  "website": "https://northstar.example",
  "location": "Austin, TX",
  "industry": "SaaS",
  "description": "Data products for operations teams."
}
```

## Jobs

- `GET /jobs/`
- `GET /jobs/?category=Engineering&location=Remote&salary_min=90000&salary_max=150000`
- `POST /jobs/` recruiter only.
- `PATCH /jobs/{id}/` recruiter only for own jobs.
- `DELETE /jobs/{id}/` recruiter only for own jobs.

Create example:

```json
{
  "company": 1,
  "title": "Frontend Engineer",
  "description": "Build responsive hiring workflows.",
  "category": "Engineering",
  "location": "Remote",
  "salary_min": 90000,
  "salary_max": 140000,
  "job_type": "full_time",
  "status": "active",
  "required_skills": ["React", "Accessibility", "REST APIs"]
}
```

## Applications

- `GET /applications/` scoped to seeker, recruiter-owned jobs, or admin.
- `POST /applications/` seeker only.
- `PATCH /applications/{id}/status/` recruiter/admin only.

Apply example:

```json
{
  "job": 1,
  "cover_letter": "I have shipped production React and Django systems."
}
```

Status update example:

```json
{
  "status": "shortlisted",
  "recruiter_notes": "Strong frontend portfolio."
}
```

Valid status values:

- `applied`
- `review`
- `shortlisted`
- `rejected`
- `hired`

## Analytics

Admin only.

`GET /analytics/`

Response:

```json
{
  "success": true,
  "data": {
    "users": {
      "total": 42,
      "active": 38,
      "by_role": [{"role": "seeker", "count": 30}]
    },
    "jobs": {
      "total": 12,
      "active": 10,
      "inactive": 2
    },
    "applications": {
      "total": 80,
      "by_status": [{"status": "shortlisted", "count": 9}]
    }
  }
}
