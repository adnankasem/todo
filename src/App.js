import logo from "./logo.svg";
import "./App.css";
import Input from "./Input";
import Todos from "./Todos";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Footer from "./Footer";
import { useEffect } from "react";

function App() {
  let [todos, setTodos] = useState([]);
  let [input, setInput] = useState("");
  let [filter, setFilter] = useState("ALL");

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
  }, [todos]);

  return (
    <div className="app">
      <h1 className="app-heading">todos</h1>
      <Input addInput={addInput} input={input} setInput={setInput} />
      <Todos
        todos={todos}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        filter={filter}
      />
      <Footer setFilter={setFilter} />
    </div>
  );
}

export default App;
