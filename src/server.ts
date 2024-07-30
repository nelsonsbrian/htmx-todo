import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { Todo } from "./components/models/Todo";
import { createRow } from "./components/todoRow";
import { renderHTML } from "./utils/RenderUtils";
import { createStatus } from "./components/status";
import { todo } from "node:test";

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "tsx");
app.engine("tsx", require("express-react-views").createEngine());
app.set("views", path.join(__dirname, "../views"));

let todos: Todo[] = [];
let lastId = 0;
(async () => {
  todos = await fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((json) => {
      // console.log(json);
      return json;
    });

  lastId = todos.reduce((acc, todo) => {
    return Math.max(acc, todo.id);
  }, 0);
})();

app.post("/add-todo", (req, res) => {
  console.log(req.body);
  const message = req.body.message;

  const todo = {
    userId: 5,
    id: lastId + 1,
    title: message,
    completed: false,
  };
  todos.push(todo);

  res.send(renderHTML(createRow(todo), createStatus(`Added todo: ${message}`)));
});

app.get("/todos", async (req, res) => {
  res.send(renderHTML(...todos.map((todo) => createRow(todo))));
});

app.delete("/delete-todo/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todos.splice(index, 1);
    res.send(renderHTML(createStatus(`Deleted todo: ${id}`)));
  } else {
    res.status(404).send("Todo not found");
  }
});

app.put("/completed-todo/:id", (req, res) => {
  const todoId = parseInt(req.params.id);

  const todo = todos.find((t) => t.id === todoId);
  if (todo) {
    todo.completed = !todo.completed;
    res.send(
      renderHTML(createRow(todo), createStatus(`Updated todo: ${todo.title}`))
    );
  } else {
    res.status(404).send("Todo not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
