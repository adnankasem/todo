import React from "react";
import Footer from "./Footer";
import Input from "./Input";
import Todo from "./Todo";
function Todos({
  todos,
  completeTodo,
  deleteTodo,
  editTodo,
  filter,
  addInput,
  input,
  setInput,
  setFilter,
  itemsLeft,
  clearTodos,
  completeAll,
  allAreInComplete,
}) {
  console.log("filter: ", filter);
  const filteredTodos = todos.filter((todo) => {
    if (filter === "ACTIVE") {
      return !todo.completed;
    } else if (filter === "COMPLETED") {
      return todo.completed;
    } else {
      return true;
    }
  });

  return (
    <div className="todos">
      <Input
        addInput={addInput}
        input={input}
        setInput={setInput}
        completeAll={completeAll}
      />

      {filteredTodos.map((todo) => {
        return (
          <Todo
            key={todo._id}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        );
      })}
      <Footer
        setFilter={setFilter}
        todos={todos}
        itemsLeft={itemsLeft}
        clearTodos={clearTodos}
        allAreInComplete={allAreInComplete}
      />
    </div>
  );
}

export default Todos;
