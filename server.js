const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const http = require('http');
const socket = require('./socket'); // Socket.IO setup
require('dotenv').config();

// ========== MIDDLEWARE ==========
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://tf-task-management-system.netlify.app',
  ],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// ========== DATABASE ==========
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Atlas Connected'))
.catch((err) => console.error('❌ MongoDB Connection Failed:', err));

// ========== VIEW ENGINE ==========
app.set('view engine', 'ejs');

// ========== ROUTES ==========
const Tasks = require('./routes/tasks');
const Task = require('./routes/task');
const Login = require('./routes/login');
const Register = require('./routes/Register');
const Dashboard = require('./routes/Dashboard');
const Collaborate = require('./routes/Collaborate');
const Edit = require('./routes/Edit');
const AddTasks = require('./routes/AddTasks');
const AuthRoutes = require('./routes/auth');
const Teams = require('./routes/teams');
const AiEnhance = require('./routes/aiEnhance'); // 🧠 AI Route

// ========== ROUTE MOUNTS ==========
app.use('/tasks', Tasks);
app.use('/task', Task);
app.use('/login', Login);
app.use('/register', Register);
app.use('/dashboard', Dashboard);
app.use('/collaborate', Collaborate);
app.use('/edit', Edit);
app.use('/addtasks', AddTasks);
app.use('/auth', AuthRoutes);
app.use('/teams', Teams);
app.use('/ai', AiEnhance); // 🧠 AI Task Enhancer

// ========== HOME PAGE ==========
app.get("/", (req, res) => {
  res.render("index");
});

// ========== SERVER & SOCKET ==========
const server = http.createServer(app);
const io = socket.init(server);

// ========== START SERVER ==========
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
