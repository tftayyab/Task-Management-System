const express = require('express');
const app = express();
const Joi = require('joi');
const cors = require('cors');

app.use(cors());


const mongoose = require('mongoose');

app.use(express.json());
const taskRoutes = require('./routes/tasks');
const taskByIdRoutes = require('./routes/tasksById');


mongoose.connect('mongodb://127.0.0.1:27017/taskdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));


app.set('view engine', 'ejs');
app.use('/tasks', taskRoutes);
app.use('/task', taskByIdRoutes); 


app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
