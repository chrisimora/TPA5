const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv/config");

// Import Routes
const toDoRouter = require("./routes/todo.router");
const userRouter = require("./routes/user.router");

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.use(express.json());

app.use("/todo", toDoRouter);
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
