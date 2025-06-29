# Task Management System

## 📌 Overview

This is a **Task Management System** developed as part of a software development internship assignment. The application allows users to create, update, delete, and manage tasks with advanced features like authentication, search, filters, and progress tracking.

## ✅ Features

- **CRUD Operations** for Tasks  
- **User Authentication** with **JWT** and **bcrypt** password hashing  
- **Search and Filter** tasks by status and keywords  
- **Task Progress Tracking** with visual indicators  
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
- **bcrypt** (Password hashing for security)

> Passwords are never stored in plain text. During registration, passwords are hashed using **bcrypt** before saving to the database, and during login, bcrypt compares the entered password with the stored hash to ensure secure authentication.

### Frontend
- **React.js**  
- **Axios** (API calls)  
- **Tailwind CSS** (Styling)

---

## 🚀 Live Demo

🔗 [View Live Site](https://tf-task-management-system.netlify.app)

You can visit the live application and test it out with a smooth UI and full functionality.

---

## 💻 How to Clone and Run Locally

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/task-management-system.git
   cd task-management-system
2. **Install Backend dependencies:**

     ```bash
    cd backend
    npm install
3.**Create a .env file in the backend folder and add:**

    PORT=3000
    MONGO_URI=Your Mongodb atlas server link.
    JWT_SECRET=Your secret keys.
    JWT_REFRESH_SECRET=Your secret keys.
4. **Create a .env file in the frontend folder and add:**
   
       VITE_API_URL=http://localhost:3000
5. **Run the backend server:**

        npm run dev
6. **Install Frontend dependencies:**

        cd /client
        npm install
7.**Run the frontend development server:**
   
    npm start
8.**Open in your browser:**

    http://localhost:5173

  Leave comments down on how it can be made better
