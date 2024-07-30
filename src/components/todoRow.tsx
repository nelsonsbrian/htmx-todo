import { Todo } from "./models/Todo";
import * as React from "react";

export const createRow = (todo: Todo) => {
  return (
    <tr id={`todo-${todo.id}`} className="todo">
      <td className="todo-title">{todo.title}</td>
      {createCompleteCheckbox(todo)}
      <td>
        <button
          hx-delete={`/delete-todo/${todo.id}`}
          hx-target={`#todo-${todo.id}`}
          hx-swap="delete"
          hx-disabled-elt="this"
          disabled={!todo.completed}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export const createCompleteCheckbox = (todo: Todo) => {
  return (
    <td style={{ display: "flex", justifyContent: "center" }}>
      <input
        type="checkbox"
        hx-put={`/completed-todo/${todo.id}`}
        name="completed"
        hx-trigger="change"
        hx-swap="outerHTML"
        onChange={(e) => {
          // todo.completed = e.target.checked;
        }}
        checked={todo.completed}
        hx-target={`#todo-${todo.id}`}
        hx-disabled-elt="this"
      />
    </td>
  );
};
