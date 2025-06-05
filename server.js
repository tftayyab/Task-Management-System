const express = require('express');
const app = express();

// Import router FIRST before using it
const userRouter = require('./routes/tasks'); // Use ./ not /

app.set('view engine', 'ejs');
app.use('/tasks', userRouter); // Use the router here

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
