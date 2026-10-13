# Auth0 Identity Server (OAuth & OIDC) Single Sign on Demo

## Overview

A sample application demonstrating OAuth 2.0 authentication using Auth0 cloud hosted identity server, a React frontend, and an ASP.NET Core Web API.

Users can log in through Auth0, view their authenticated user details, and access public and protected API endpoints.

## Technologies Used

### Frontend
- React
- TypeScript
- Vite
- Bootstrap
- Auth0 React SDK
- Axios

### Backend
- C#
- ASP.NET Core Web API
- .NET 9
- JWT Bearer Authentication

### Identity Provider
- Auth0
- OAuth 2.0
- OpenID Connect
- JSON Web Tokens (JWT)

## Project Structure

```text
Auth0OAuthDemo
│
├── backend
│   └── Auth0Demo.Api
│       ├── Controllers
│       │   └── MessagesController.cs
│       ├── Program.cs
│       └── appsettings.json
│
├── frontend
│   └── auth0-demo-client
│       ├── src
│       │   ├── services
│       │   │   └── messageService.ts
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── .env
│       └── package.json
│
└── README.md
```

## Features Implemented

### Authentication

- Login using Auth0.
- Logout through Auth0.
- Redirect back to the React application after login.
- Display the authenticated user's name, email, and Auth0 user ID.
- Obtain an access token for the Web API.

### API Integration

- Call a public API endpoint without authentication.
- Call a protected API endpoint using a Bearer access token.
- Display API responses in the React UI.
- Use Axios to make HTTP requests.

### API Security

- Validate JWT access tokens using ASP.NET Core JWT Bearer authentication.
- Protect endpoints using the `[Authorize]` attribute.
- Reject requests without an access token.
- Reject requests containing an invalid access token.

## Auth0 Configuration

Create the following in your Auth0 tenant.

### 1. Application

Create a **Single Page Application (SPA)** named `auth0-demo-react`.

Configure the following URLs for local development:

| Setting | Value |
|---|---|
| Allowed Callback URLs | `http://localhost:5173` |
| Allowed Logout URLs | `http://localhost:5173` |
| Allowed Web Origins | `http://localhost:5173` |

Grant the application user-delegated access to the API.

### 2. API

Create an API named `auth0-demo-api`.

| Setting | Value |
|---|---|
| Identifier (Audience) | `https://auth0-demo-api` |
| Signing Algorithm | `RS256` |

Configure the API's application access permissions as required for the SPA.

### 3. Test User

Create a test user in Auth0's **User Management → Users** section. Use this account to sign in to the React application.

## Configuration

### Frontend

Create a `.env` file in `frontend/auth0-demo-client`:

```env
VITE_AUTH0_DOMAIN=dev-wmba5ficu3tx0zjt.us.auth0.com
VITE_AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
VITE_AUTH0_AUDIENCE=https://auth0-demo-api
VITE_API_BASE_URL=https://localhost:7104
```

Replace the placeholder values with your Auth0 application details and the HTTPS URL of your running API.

Do not commit secrets or passwords to source control. Keep local environment files out of version control where appropriate.

### Backend

Configure the Auth0 settings in `backend/Auth0Demo.Api/appsettings.json`:

```json
{
  "Auth0": {
    "Domain": "dev-wmba5ficu3tx0zjt.us.auth0.com",
    "Audience": "https://auth0-demo-api"
  }
}
```

Replace `dev-wmba5ficu3tx0zjt.us.auth0.com` with your Auth0 tenant domain.

The API uses this configuration to validate the issuer and audience of incoming access tokens.

## Running the Application

### 1. Start the Backend API

Open a terminal in the backend project directory:

```bash
cd backend/Auth0Demo.Api
dotnet restore
dotnet run
```

Note the HTTPS URL and port printed by the application. Use this URL in the frontend `.env` file.

### 2. Start the React Frontend

Open another terminal:

```bash
cd frontend/auth0-demo-client
npm install
npm run dev
```

Open the local URL shown by Vite, normally:

`http://localhost:5173`

If you change the frontend `.env` file, restart the Vite development server.

## API Endpoints

| Method | Endpoint | Authentication |
|---|---|---|
| GET | `/api/messages/public` | Not required |
| GET | `/api/messages/protected` | Required |

### Public Endpoint

```http
GET /api/messages/public
```

Returns a public message without requiring an access token.

### Protected Endpoint

```http
GET /api/messages/protected
Authorization: Bearer <access_token>
```

Returns a protected message when a valid Auth0 access token is supplied.

Requests must contain an access token issued for the configured API audience.

## Authentication Flow

1. The user clicks **Login** in the React application.
2. The React application redirects the user to Auth0.
3. Auth0 authenticates the user.
4. Auth0 redirects the user back to React.
5. The React application obtains an access token for the API.
6. React sends the access token in the `Authorization` header.
7. ASP.NET Core validates the token.
8. The API returns the protected response if authentication succeeds.

## Security Testing

The following scenarios have been tested:

| Scenario | Expected HTTP status | Result |
|---|---|---|
| Public endpoint without a token | `200 OK` | Passed |
| Protected endpoint without a token | `401 Unauthorized` | Passed |
| Protected endpoint with an invalid token | `401 Unauthorized` | Passed |
| Protected endpoint with a valid Auth0 access token | `200 OK` | Passed |

## Future Improvements

- Add automated frontend and backend tests.
- Add role-based or permission-based authorization.
- Add additional protected API endpoints.
- Improve API error handling and user feedback.
- Add a production deployment configuration.
- Document token claims and JWT validation in more detail.

## Learning Objectives

This project demonstrates:

- How OAuth 2.0 and OpenID Connect work with Auth0.
- How to authenticate users in a React SPA.
- The difference between an ID token and an access token.
- How to protect ASP.NET Core API endpoints.
- How JWT Bearer authentication validates API requests.
- How a frontend securely passes an access token to a backend API.
