## Overview

This document outlines the setup and usage of the Node.js Role-Based Login API project. The API allows users to register, log in, and access specific routes based on their assigned roles. Key technologies used include JWT authentication, the Zod library for validation, MongoDB as the database, and Mongoose as the ODM.

## Setup Instructions

1. Clone the Repository:
   ```sh
   git clone https://github.com/Harshsharma836/ReactNode-Sandbox.git
   ```

2. **Change directory to the Node.js Role-Based Login API folder:**
   ```sh
   cd Node.js Role-Based Login API
   ```

3. **Install Dependencies:** 
   ```sh
   npm install
   ```

4. **Environment Setup:** 
   Create an `.env` file in the root directory with the following variables:
   ```sh
   PORT=3001
   SECRET=YOUR_SECRET_KEY
   MONGODB_URI=YOUR_MONGODB_URI
   ```
   Replace `YOUR_SECRET_KEY` with your JWT secret key and `YOUR_MONGODB_URI` with your MongoDB connection string.

5. **Start the Server:** 
   ```sh
   npm start
   ```

## API Endpoints

- `POST /api/auth/register`: Register a new user. Payload should include `username`, `password`, and `roles`.
- `POST /api/auth/login`: Log in an existing user. Payload should include `username` and `password`.
- `GET /api/auth/profile`: Get user profile information. Requires a valid JWT in the `Authorization` header.
- `GET /api/admin/dashboard`: Get admin dashboard information. Requires a valid JWT with an `admin` role in the `Authorization` header.

## JWT Authentication

- JWT is used for authentication. Upon successful login, a JWT is generated and returned in the response.
- JWT is required for accessing protected routes. Include it in the `Authorization` header as `Bearer YOUR_JWT_TOKEN`.

## Role-Based Access Control (RBAC)

- Two roles are defined: `user` and `admin`.
- Middleware is implemented to check user roles before allowing access to specific routes.
- Certain routes are restricted to only `admin` role.

## Testing

- Unit tests are written using the Mocha testing framework.
- Run tests using `npm run test`.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

[GitHub Repo](https://github.com/Harshsharma836/ReactNode-Sandbox/tree/main/Node.js%20Role-Based%20Login%20API)

[Postman Collection](https://www.postman.com/planetary-firefly-68128/workspace/reactnode-sandbox/collection/30161518-c1082ba8-1815-4c2a-880e-e6f14c4770bc?action=share&creator=30161518)

## Documentation

The detailed documentation for this project can be found in [this PDF file].
[Node.pdf](https://github.com/Harshsharma836/ReactNode-Sandbox/files/14589893/Node.pdf)


