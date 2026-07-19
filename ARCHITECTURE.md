# Project Architecture

## Frontend
- React.js
- React Router
- Axios
- TipTap Editor

## Backend
- Node.js
- Express.js
- JWT Authentication
- SQLite Database

## Database Tables

### Users
- id
- username
- email
- password

### Documents
- id
- title
- content
- ownerId

### Shared Documents
- id
- documentId
- userId

## Application Flow

User
↓
Login/Register
↓
JWT Token
↓
Protected API Routes
↓
SQLite Database
↓
Document Operations

## Features

- User Registration
- User Login
- JWT Authentication
- Create Documents
- Edit Documents
- Save Documents
- Share Documents
- Upload Text/Markdown Files