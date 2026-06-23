# Authentication Flow

## Registration

Users register at `POST /api/auth/register/` with a role of `seeker` or `recruiter`. Admin accounts are intentionally blocked from public registration and should be created by an existing admin or through Django admin.

When a seeker registers, the backend automatically creates an empty `SeekerProfile`.

## Login

Clients authenticate at `POST /api/auth/token/`:

```json
{
  "username": "maya",
  "password": "strong-password"
}
```

The response includes `access` and `refresh` tokens. The access token includes these UI routing claims:

```json
{
  "user_id": 1,
  "username": "maya",
  "role": "seeker",
  "email": "maya@example.com"
}
```

## Token Refresh

When an API request returns `401`, the frontend Axios interceptor posts the refresh token to `POST /api/auth/token/refresh/`. If refresh succeeds, the original request is retried with the new access token.

## RBAC Enforcement

API enforcement:

- Seekers can manage their own profile and create applications.
- Recruiters can manage their own companies, jobs, and applications for jobs they own.
- Admins can manage users and read platform analytics.
- Viewsets scope querysets by role, so users cannot fetch records outside their permitted boundary.

Frontend enforcement:

- `ProtectedRoute` blocks unauthenticated users.
- Role-specific routes, navigation links, and actions are hidden unless the signed-in role is allowed.
- UI role checks are treated as usability only; backend permission checks remain authoritative.

## Logout

Logout removes `accessToken` and `refreshToken` from local storage and redirects the user to `/login`.
