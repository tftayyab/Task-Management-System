const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config(); // Load JWT_SECRET and JWT_REFRESH_SECRET

// Allow cookies and frontend communication
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true // Needed to accept cookies
}));

app.use(express.json());
app.use(cookieParser()); // For reading/writing cookies

// Mongoose setup
mongoose.connect('mongodb://127.0.0.1:27017/Task-ManagerDB')
  .then(() => console.log('MongoDB Connected to Task-ManagerDB'))
  .catch((err) => console.log(err));

// View engine
app.set('view engine', 'ejs');

// Route imports
const MyTasks = require('./routes/tasks');
const ViewTasks = require('./routes/task');
const tasks = require('./routes/tasks');
const task = require('./routes/task');
const login = require('./routes/login');
const Register = require('./routes/Register');
const Dashboard = require('./routes/Dashboard');
const Edit = require('./routes/Edit');
const AddTasks = require('./routes/AddTasks');
const AuthRoutes = require('./routes/auth'); // NEW — for refresh token and logout

// Mount routes
app.use('/tasks', tasks);
app.use('/task', task);
app.use('/mytask', MyTasks);
app.use('/viewtask', ViewTasks); 
app.use('/login', login);
app.use('/edit', Edit);
app.use('/dashboard', Dashboard);
app.use('/register', Register);
app.use('/addtasks', AddTasks);
app.use('/auth', AuthRoutes); // NEW: contains /refresh-token and /logout

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
