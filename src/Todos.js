import React from "react";
import Todo from "./Todo";
function Todos({ todos, completeTodo, deleteTodo, editTodo, filter }) {
  console.log("filter: ", filter);
  const filteredTodos = todos.filter((todo) => {
    if (filter === "ACTIVE") {
      return !todo.complete;
    } else if (filter === "COMPLETED") {
      return todo.complete;
    } else if (filter === "ALL") {
      return true;
    }
  });

  return (
    <div className="todos">
      {filteredTodos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        );
      })}
    </div>
  );
}

export default Todos;
