const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// ==== Middleware Setup ====
app.use(cors({
    origin: [
      'http://localhost:5173',
      'https://tf-task-management-system.netlify.app'
    ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ==== Mongoose Connection ====
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Atlas Connected'))
.catch((err) => console.error('❌ MongoDB Connection Failed:', err));

// ==== View Engine ====
app.set('view engine', 'ejs');

// ==== Route Imports ====
const MyTasks = require('./routes/tasks');
const ViewTasks = require('./routes/task');
const tasks = require('./routes/tasks');
const task = require('./routes/task');
const login = require('./routes/login');
const Register = require('./routes/Register');
const Dashboard = require('./routes/Dashboard');
const Collaborate = require('./routes/Collaborate');
const Edit = require('./routes/Edit');
const AddTasks = require('./routes/AddTasks');
const AuthRoutes = require('./routes/auth');
const Teams = require('./routes/teams');

// ==== Mount Routes ====
app.use('/tasks', tasks);
app.use('/task', task);
app.use('/mytask', MyTasks);
app.use('/viewtask', ViewTasks);
app.use('/login', login);
app.use('/edit', Edit);
app.use('/dashboard', Dashboard);
app.use('/collaborate', Collaborate);
app.use('/register', Register);
app.use('/addtasks', AddTasks);
app.use('/auth', AuthRoutes);
app.use("/teams", Teams);


// ==== Home Page ====
app.get("/", (req, res) => {
    res.render("index");
});

// ==== Server Port ====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
