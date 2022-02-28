const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const { json } = require("body-parser");
const Todo = require("./models/Todo");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful"))
  .catch((err) => {
    console.log(err);
  });

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo.completed = false;
  try {
    const savedTodo = await newTodo.save();
    res.status(200).json(savedTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.patch("/todos/:id", async (req, res) => {
  try {
    const todoItem = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(todoItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/todos', async (req, res) => {
  try{
    await Todo.deleteMany({completed:true});
    const todos = await Todo.find();
    res.status(200).json(todos);
  }catch(err){
    res.status(500).json(err);
  }
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
