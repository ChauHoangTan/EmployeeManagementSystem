# **Employee Management System**
A full-stack Employee Management System built using Angular on the frontend and Java Spring Boot on the backend with PostgreSQL as the database. This project demonstrates CRUD operations, authentication, and role-based access control for managing employees in an organization.

# Table of Contents
## Features
## Technologies
## Project Structure
## Setup & Installation
## Running the Application
## Usage

# Features
## Employee Management:
- Create, read, update, and delete employee records.
- Employee details include personal information, department, role, etc.
- Home:
- ![image](https://github.com/user-attachments/assets/51404462-9ad0-4e80-bbda-8db67a51b58f)
- ![image](https://github.com/user-attachments/assets/02d79ae7-fc4f-416c-9c9b-5763c8af0819)
- ![image](https://github.com/user-attachments/assets/7d98a37f-884a-4762-8c63-61912d53b35a)
- Employee Detail:
- ![image](https://github.com/user-attachments/assets/a3b25b91-48fd-40f1-9163-fd9eebc5a726)

## Authentication & Authorization:
- Secure login with Spring Security.
- Role-based access control to protect sensitive operations.
- Login:
- ![image](https://github.com/user-attachments/assets/9c1da98f-8da4-4551-9225-faf8c0b2d83c)
- Forgot Password Verify:
- ![image](https://github.com/user-attachments/assets/d1e4e9b9-3f5e-49a0-abc0-9c9226128ea1)
- ![image](https://github.com/user-attachments/assets/675be15e-07fc-43b6-ab1c-41696d6e80cc)
- ![image](https://github.com/user-attachments/assets/08cba65d-9067-4c24-bfa2-ebdcbd4cc625)

## Responsive UI:
- Built with Angular for dynamic, single-page application experience.
- HTML, SCSS, and TypeScript used for clean, modular front-end code.
## Backend:
- RESTful APIs built with Spring MVC.
- Data persistence with Spring JPA and PostgreSQL.
## Scalable Architecture:
- Spring Boot for easy configuration and rapid development.
- Easily extendable for additional modules like reporting and analytics.

# Technologies
## Frontend
- HTML5
- SCSS – for styling
- TypeScript
- AngularJS/Angular – (if using Angular 2+, replace AngularJS with Angular)
# Backend
- Java Spring Boot
- Spring MVC
- Spring JPA
- Spring Security
- PostgreSQL

# Project Structure
```
employee-management-system/
├── backend/               # Spring Boot application
│   ├── src/main/java/...  # Java source code
│   ├── src/main/resources # Application properties, SQL scripts, etc.
│   └── pom.xml            # Maven configuration
└── frontend/              # Angular application
    ├── src/
    │   ├── app/           # Angular components, services, modules
    │   ├── assets/        # Images, fonts, etc.
    │   └── styles/        # SCSS stylesheets
    ├── angular.json        # Angular configuration
    └── package.json        # Node package dependencies
```

# Setup & Installation
## Prerequisites
- Java 11 or above installed.
- Maven for building the backend.
- Node.js & npm for the frontend.
- PostgreSQL installed

# Usage
## User Authentication & Authorization
### Login & Sign Up:
- Users can register for a new account. Upon registration, a one-time password (OTP) is sent to the user's email for verification.
Once verified, users can log in using their credentials.
- JWT tokens are issued upon successful authentication and used for securing further API calls.
- JWT-based Authorization:
The backend uses Spring Security integrated with JWT to secure endpoints.
Role-based access control ensures that only authorized users can access certain parts of the system.

## Theme Mode
The Angular frontend supports toggling between light and dark themes.
Users can switch themes from the settings or header menu for a personalized experience.

## Employee Management
### CRUD Operations:
- Create: Add a new employee with details such as name, department, and role.
- Read: View detailed information of each employee.
- Update: Edit employee details.
- Delete: Remove an employee record from the system.

## Employee List with Pagination:
- The employee list is displayed in a paginated table.
- Users can navigate between pages to view all employee records.
- API Endpoints:
- User APIs:
```
POST /authenticate/signup: Register a new user and send OTP via email.
POST /authenticate/login: Authenticate a user and issue a JWT token.
POST /authenticate/forgot-password/verify-username: Verify is username is correct or not.
POST /authenticate/forgot-password/verify-code: Verify is code is correct or not.
POST /authenticate/forgot-password/change-new-password: Change user's password.
```
## Employee APIs:
```
GET /employees: Retrieve a paginated list of employees.
GET /employees/{id}: Retrieve details for a specific employee.
GET /employees/search: Search employees follow keyword.
POST /employees: Create a new employee.
PUT /employees/{id}: Update an existing employee.
DELETE /employees/{id}: Delete an employee record.
```

# How It Works:
## User Registration:
1. User fills out the signup form on the Angular frontend.
2. Backend sends an OTP to the provided email.
3. User verifies OTP to activate the account.

## User Login:
1. User logs in with their credentials.
2. Backend validates credentials and returns a JWT token.
3. The token is stored (e.g., in localStorage) and attached to subsequent API requests.

## Employee Management:
1. Authenticated users can perform CRUD operations on employee data.
2. The Angular frontend interacts with the backend REST APIs to display and update employee information.
3. Pagination ensures efficient display and navigation through large sets of employee records.
