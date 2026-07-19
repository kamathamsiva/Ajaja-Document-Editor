# 📄 Ajaja Document Editor

A full-stack document management and collaboration platform that enables users to securely register, log in, create, edit, organize, and share documents. The application uses JWT authentication, SQLite for data storage, and provides a clean React-based user interface.

---

## 🚀 Live Demo

### Frontend
https://ajaja-document-editor.vercel.app

### Backend API
https://ajaja-document-editor.onrender.com

---

## 📌 Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Password Hashing using bcryptjs

### Document Management
- Create Documents
- View Documents
- Edit Documents
- Delete Documents
- Save Document Content

### Sharing
- Share documents with other users
- Manage shared documents

### File Upload
- Upload files using Multer

### User Experience
- Responsive React UI
- React Router Navigation
- Axios API Integration
- Error Handling
- Loading States

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- CSS

## Backend

- Node.js
- Express.js
- SQLite3
- JWT
- bcryptjs
- Multer
- CORS
- dotenv

---

# 📁 Project Structure

```
Ajaja-Document-Editor/
│
├── backend/
│   ├── database/
│   ├── middleware/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env
│   └── package.json
│
├── README.md
├── AI_WORKFLOW.md
└── ARCHITECTURE.md
```

---

# 🔐 Authentication Flow

1. User registers.
2. Password is hashed using bcryptjs.
3. User logs in.
4. JWT token is generated.
5. Token is stored on the client.
6. Protected API routes validate the JWT token.

---

# 📂 API Endpoints

## Authentication

### Register

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

---

## Documents

### Get Documents

```
GET /api/documents
```

### Create Document

```
POST /api/documents
```

### Update Document

```
PUT /api/documents/:id
```

### Delete Document

```
DELETE /api/documents/:id
```

---

## File Upload

```
POST /api/documents/upload
```

---

# ⚙️ Environment Variables

## Backend (.env)

```
JWT_SECRET=your_secret_key
PORT=5000
```

## Frontend (.env)

```
VITE_API_URL=https://ajaja-document-editor.onrender.com
```

---

# 💻 Local Installation

## Clone Repository

```bash
git clone https://github.com/kamathamsiva/Ajaja-Document-Editor.git
```

---

## Backend Setup

```bash
cd backend
npm install
npm start
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🚀 Deployment

## Backend

- Platform: Render
- Runtime: Node.js 22 LTS

## Frontend

- Platform: Vercel

---

# 🔒 Security

- JWT Authentication
- Password Hashing using bcryptjs
- Protected Routes
- Environment Variables
- CORS Enabled

---

# 📈 Future Improvements

- Rich Text Editor
- Real-time Collaboration
- Document Version History
- Comments
- User Roles
- Search & Filters
- Notifications
- PDF Export
- Dark Mode

---

# 🧪 Testing

The application has been tested for:

- User Registration
- User Login
- JWT Authentication
- Document CRUD Operations
- File Upload
- Protected Routes
- Production Deployment

---

# 👨‍💻 Author

**Kamatham Siva**

B.Tech – Electronics and Communication Engineering

Full Stack Developer

GitHub:
https://github.com/kamathamsiva

Backend URL:
https://ajaja-document-editor.onrender.com/

PROJECT URL:
https://ajaja-document-editor.vercel.app/

---

# ⭐ Project Highlights

- Full Stack Web Application
- JWT Authentication
- SQLite Database
- RESTful APIs
- React + Vite Frontend
- Express Backend
- Production Deployment
- Responsive UI
- Secure Authentication
- Clean Project Architecture

---

# 📜 License

This project is created for educational purposes and portfolio demonstration.