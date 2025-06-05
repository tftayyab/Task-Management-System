const express = require("express");
const router = express.Router(); 

// Route: /tasks/
router.route("/")
  .post((req, res) => {
    res.send("task has been posted");
  })
  .get((req, res) => {  // 
    res.send("task is getting");
  });

// Route: /tasks/:id
router.route("/:id")
  .get((req, res) => {
    const id = req.params.id;
    res.send(`${id} is getting`);
  })
  .put((req, res) => {
    const id = req.params.id;
    res.send(`${id} is putting`);
  })
  .delete((req, res) => {
    const id = req.params.id;
    res.send(`${id} is deleting`);
  });

module.exports = router;
