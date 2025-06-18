const express = require('express');
const app = express();
const Joi = require('joi');
const cors = require('cors');

app.use(cors());


const mongoose = require('mongoose');

app.use(express.json());
const MyTasks = require('./routes/MyTasks');
const ViewTasks = require('./routes/ViewTasks');
const login = require('./routes/login');
const Register = require('./routes/Register');
const Dashboard = require('./routes/Dashboard');
const Edit = require('./routes/Edit');
const AddTasks = require('./routes/AddTasks');


mongoose.connect('mongodb://127.0.0.1:27017/taskdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));


app.set('view engine', 'ejs');
app.use('/tasks', MyTasks);
app.use('/task', ViewTasks); 
app.use('/login', login);
app.use('/edit', Edit);
app.use('/dashboard', Dashboard);
app.use('/register', Register);
app.use('/addtasks', AddTasks);

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
