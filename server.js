const express = require('express');
const app = express();

const mongoose = require('mongoose');

const userRouter = require('./routes/tasks'); 

mongoose.connect('mongodb://127.0.0.1:27017/taskdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));


app.set('view engine', 'ejs');
app.use('/tasks', userRouter); 

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
