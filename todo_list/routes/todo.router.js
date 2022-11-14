const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const auth = require("../middleware/auth");

// getting data
router.get("/", auth, (req, res) => {
  Todo.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// Saving data
router.post("/", auth, (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
  });

  todo
    .save()
    .then((data) => {
      res.status(201).json({ message: "Todo created", data });
    })
    .catch((err) => {
      res.status(403).json({ message: err });
    });
});

// getting data by id
router.get("/:toDoId", auth, (req, res) => {
  Todo.findById(req.params.toDoId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// deleting data by id
router.delete("/:toDoId", auth, (req, res) => {
  Todo.remove({ _id: req.params.toDoId })
    .then((data) => {
      res.status(200).json({ message: "Todo deleted" });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

// updating data by id
router.patch("/:toDoId", auth, (req, res) => {
  Todo.updateOne(
    { _id: req.params.toDoId },
    { $set: { title: req.body.title, description: req.body.description } }
  )
    .then((data) => {
      res.status(200).json({ message: "Todo updated" });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

module.exports = router;
