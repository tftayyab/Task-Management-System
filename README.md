# Task Management System

## 📌 Overview

This is a **Task Management System** built during a software development internship project. It allows users to create, edit, delete, and manage tasks efficiently. The system includes advanced features such as:

## ✅ Features

- **CRUD Operations** for Tasks  
- **User Authentication** with **JWT** and **bcrypt** password hashing  
- **Search and Filter** tasks by status and keywords  
- **Task Progress Tracking** with visual indicators
- **Dark Mode** with interactive visuals
- **Enhance Tasks with AI** 
- Responsive UI with modern styling  
- Backend & frontend **API integration**  
- Basic **unit testing** for quality assurance  

---

## 🧰 Tech Stack

### Backend
- **Node.js**  
- **Express.js**  
- **MongoDB**  
- **Joi** (Validation)  
- **JWT** (Authentication)  
- **Google Gemini** (Enhance Tasks with AI)
- **Socket.io** (Real time Teams and Tasks Notifications)
-  **bcrypt** (Password hashing for security)

> Passwords are never stored in plain text. During registration, passwords are hashed using **bcrypt** before saving to the database, and during login, bcrypt compares the entered password with the stored hash to ensure secure authentication.

### Frontend
- **React.js**  
- **Axios** (API calls)  
- **Tailwind CSS** (Styling)
- **Chart.js** (Dashboards Charts Styling)
---

## 🚀 Live Demo

🔗 [View Live Site](https://tf-task-management-system.netlify.app)

You can visit the live application and test it out with a smooth UI and full functionality.

## 🔍 Preview Access

To preview the application in its final form, use the following credentials:

- **Username:** `tftayyab`  
- **Password:** `harry.123`


---

# 🧠 Task Manager API

This API powers a task management app with features like:

- User authentication (JWT + Refresh Tokens)
- Task creation, editing, deletion
- Team-based task sharing
- AI enhancement for task titles & descriptions (Gemini API)
- Real-time notifications via Socket.IO

---

## 🔐 Authentication

### 🚀 Register  
**POST** `/user`

Creates a new user.

**Request Body:**
```json
{
  "username": "tayyab123",
  "email": "tayyab@example.com",
  "password": "yourPassword",
  "firstName": "Tayyab",
  "lastName": "Faisal"
}
```
## Returns:

accessToken in response
refreshToken as HttpOnly cookie

### 🔑 Login
**POST** `/login`

Log in a user.

**Request Body:**
```json
{
  "username": "tayyab123",
  "password": "yourPassword"
}
```
**Response Example**
```json
{
  "message": "Login successful",
  "accessToken": "jwt_token_here",
  "user": {
    "username": "tayyab123",
    "email": "tayyab@example.com",
    ...
  },
  "tasks": [ ... ]
}
```

### 🔄 Refresh
**GET** `/auth/refresh-token`

Returns a new access token using the refreshToken cookie.

### 🔓 Logout
**POST** `/auth/logout`

Clears the refreshToken cookie and removes it from the DB.

### 🤖 AI Enhancement 
**POST** `/enhance`

Enhances task title and description using Google Gemini AI.

**Request Body:**
```json
{
  "title": "Do hw",
  "description": "maths englsih complete"
}
```
**Response**
```json
{
  "enhancedTitle": "Complete Math and English Homework",
  "enhancedDescription": "• Finish all assigned math problems\n• Complete English writing task"
}
```

### 📌 Tasks
**POST** `/tasks`

Creates a Task

**Body Example:**
```json
{
  "title": "Finish Project",
  "description": "Add frontend and backend",
  "dueDate": "2025-07-22",
  "teamIds": ["<teamId1>"]
}
```

### 📂 Get All Tasks
**GET** `/tasks`

Returns all tasks owned by or shared with the user.

### 👥 Get Shared Team Tasks
**GET** `/tasks/shared`

Returns tasks shared via team memberships.

### 🎯 Get One Task 
**GET** `/task/:id`

### ✏️ Update Tasks
**PUT** `/task/:id`

Only the task owner can update.

### 🗑️ Delete Task 
**DELETE** `/task/:id`

Only the task owner can delete.

### 🧑‍🤝‍🧑 Teams
**POST** `/teams`

Creates a Task

**Body Example:**
```json
{
  "teamName": "Marketing",
  "usernames": ["tayyab", "zain"]
}
```

### 🛠️ Edit Team 
**PUT** `/teams/:id`

Only owner can update name and members.

### ❌ Delete Team 
**DELETE** `/teams/:id`

Only the team owner can delete it.

## ⚠️ Error Responses

| Code | Meaning                        |
|------|--------------------------------|
| 400  | Bad request / Validation       |
| 401  | Unauthorized / No token        |
| 403  | Forbidden / Not allowed        |
| 404  | Resource not found             |
| 500  | Server error                   |

---

## 🔧 Middleware Used

- `verifyToken` — JWT Authentication
- `validateRequest()` — Input validation
- `asyncWrapper()` — Async error handling

---

## 📡 Real-time Notifications

Powered by **Socket.IO**, the API:

- Notifies users when they're added to a team
- Emits events when new tasks are created/shared
- Uses both team and user-specific rooms

## 💻 How to Clone and Run Locally

1. **Clone the repository**:

   ```bash
      git clone https://github.com/your-username/task-management-system.git
      cd task-management-system
   ```
   
2. **Install Backend dependencies:**

     ```bash
       cd backend
       npm install
     ```
     
3.**Create a .env file in the backend folder and add:**

   ```bash
          PORT=3000
          MONGO_URI= Your Mongodb atlas server link.
          JWT_SECRET= Your secret keys.
          JWT_REFRESH_SECRET= Your secret keys.
          GEMINI_API_KEY= Your Gemini api keys
   ```

4. **Create a .env file in the frontend folder and add:**

   ```bash
       VITE_API_URL= http://localhost:3000
   ```
5. **Run the backend server:**

   ```bash
    npm run dev
   ```
   
7. **Install Frontend dependencies:**

   ```bash
        cd /client
        npm install
   ```
8.**Run the frontend development server:**

   ```bash
       npm start
   ```
9.**Open in your browser:**

   ```bash
    http://localhost:5173
   ```

