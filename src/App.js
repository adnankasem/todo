import "./App.css";
import Todos from "./Todos";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

function App() {
  let [todos, setTodos] = useState([]);
  let [input, setInput] = useState("");
  let [filter, setFilter] = useState("ALL");
  let [itemsLeft, setItemsLeft] = useState(null);

  let allAreInComplete = todos.every((todo) => !todo.complete);
  console.log("all are incompleted: ", allAreInComplete);

  const addInput = (input) => {
    setTodos([...todos, { text: input, complete: false, id: uuidv4() }]);
  };

  const completeTodo = (completeId) => {
    const todosAfterComplete = todos.map((todo) => {
      if (todo.id === completeId) {
        return { ...todo, complete: !todo.complete };
      } else return todo;
    });
    setTodos(todosAfterComplete);
  };

  const deleteTodo = (deleteId) => {
    const todosAfterDelete = todos.filter((todo) => {
      return todo.id !== deleteId;
    });
    setTodos(todosAfterDelete);
  };
  const clearTodos = () => {
    const todosAfterClear = todos.filter((todo) => {
      return !todo.complete;
    });
    setTodos(todosAfterClear);
  };

  const completeAll = () => {
    let allAreComplete = todos.every((todo) => todo.complete);
    console.log("All are completed: ", allAreComplete);

    const todosAfterCompleteAll = todos.map((todo) => {
      if (!allAreComplete) {
        return { ...todo, complete: true };
      } else {
        return { ...todo, complete: !todo.complete };
      }
    });
    setTodos(todosAfterCompleteAll);
  };

  const editTodo = (e, editedInput, editedInputId, setEditing) => {
    if (e.key === "Enter") {
      const todosAfterEdit = todos.map((todo) => {
        if (editedInputId === todo.id) {
          return { ...todo, text: editedInput, complete: false };
        } else return todo;
      });
      setTodos(todosAfterEdit);
      setEditing(false);
    }
  };

  useEffect(() => {
    console.log("todos: ", todos);
    const activeTodos = todos.filter((todo) => !todo.complete);
    setItemsLeft(activeTodos.length);
  }, [todos]);

  return (
    <div className="app">
      <h1 className="app-heading">todos</h1>
      {/* <Input addInput={addInput} input={input} setInput={setInput} /> */}
      <Todos
        todos={todos}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        filter={filter}
        addInput={addInput}
        input={input}
        setInput={setInput}
        setFilter={setFilter}
        itemsLeft={itemsLeft}
        clearTodos={clearTodos}
        completeAll={completeAll}
        allAreInComplete={allAreInComplete}
      />
      {/* <Footer setFilter={setFilter} /> */}
    </div>
  );
}

export default App;
