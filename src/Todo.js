import React from "react";
import { useState } from "react";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

function Todo({ todo, completeTodo, deleteTodo, editTodo }) {
  let [editing, setEditing] = useState(false);
  let [editedInput, setEditedInput] = useState(todo.text);
  let [deleteStyle, setDeleteStyle] = useState({ display: "none" });

  if (editing) {
    return (
      <input
        value={editedInput}
        onChange={(e) => setEditedInput(e.target.value)}
        onKeyPress={(e) => editTodo(e, editedInput, todo.id, setEditing)}
      />
    );
  }

  return (
    <>
      <div
        onMouseEnter={(e) =>
          setDeleteStyle({ display: "inline", color: "red" })
        }
        onMouseLeave={(e) => setDeleteStyle({ display: "none", color: "red" })}
        className="todo"
      >
        <p onClick={() => completeTodo(todo.id)}>
          {todo.complete ? <FaCheckCircle /> : <FaCircle />}
        </p>
        <p
          className="todo-text"
          onClick={() => setEditing(true)}
          style={todo.complete ? { textDecoration: "line-through" } : null}
        >
          {todo.text}
        </p>
        <div className="x-div">
          <p onClick={() => deleteTodo(todo.id)} style={deleteStyle}>
            X
          </p>
        </div>
      </div>
    </>
  );
}

export default Todo;
