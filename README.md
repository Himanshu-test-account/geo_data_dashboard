Geo Data Dashboard

A Geo Data Dashboard application with a modern frontend and backend architecture.

Project structure

The project is organized into two main parts:

Frontend
Located in the app directory and built with Vite
.

Backend
Located in the backend directory and contains all server-side logic, APIs, and data handling.

Development

To start the application in development mode:

npm run dev


This command starts both the frontend and backend development servers with hot reloading enabled.

Authentication

The application currently uses a lightweight authentication mechanism suitable for development and prototyping.

Before deploying to production, consider implementing a production-ready authentication solution such as:

Email/password authentication

OAuth providers

Single Sign-On (SSO)

Developing and deploying the app

Use standard Vite workflows for frontend development.

Configure environment variables appropriately for each environment.

Validate and secure backend APIs before production deployment.

Follow general best practices for performance, security, and maintainability.

HTTP API

Application-specific HTTP routes are defined in the backend router files.

Routing is structured to keep authentication logic separate from domain-specific endpoints, making the system easier to reason about, test, and extend
