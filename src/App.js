import "./App.css";
import Todos from "./Todos";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  let [todos, setTodos] = useState([]);
  let [input, setInput] = useState("");
  let [filter, setFilter] = useState("ALL");
  let [itemsLeft, setItemsLeft] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const getAll = await fetch("http://localhost:4000/all");
    const allTasks = await getAll.json();
    // console.log("getall: ", getAll.json());
    setTodos(allTasks);
    console.log("todosFromUseEffect: ", todos);
    }
    fetchData()
    
  }, []);

  const fetchAllTasks = async () => {
    const getAll = await fetch("http://localhost:4000/all");
    const allTasks = await getAll.json();
    setTodos(allTasks);
  }

  const addInput = async (input) => {
    const response = await fetch("http://localhost:4000/save", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: input, completed: false }),
    });
    fetchAllTasks()

   
  };

  const completeTodo = async (completeId) => {
    const response = await fetch("http://localhost:4000/completeone", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: completeId }),
    });



    fetchAllTasks()
  };

  const deleteTodo = async (deleteId) => {
    


    const response = await fetch("http://localhost:4000/delete", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({_id: deleteId  }),
    });

    fetchAllTasks()
  };


  const clearTodos = async () => {

    const response = await fetch("http://localhost:4000/deletecompleted", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({_id: deleteId  }),
    });

    fetchAllTasks()


    // const todosAfterClear = todos.filter((todo) => {
    //   return !todo.complete;
    // });
    // setTodos(todosAfterClear);
  };

  const completeAll = async () => {

    let allAreComplete = todos.every((todo) => todo.completed);
    console.log('allarecomplete in frontend: ',allAreComplete)

    const response = await fetch("http://localhost:4000/completeall", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ allAreComplete: allAreComplete  }),
    });



    fetchAllTasks()




    

    // const todosAfterCompleteAll = todos.map((todo) => {
    //   if (!allAreComplete) {
    //     return { ...todo, complete: true };
    //   } else {
    //     return { ...todo, complete: !todo.complete };
    //   }
    // });
    // setTodos(todosAfterCompleteAll);
  };

  const editTodo = async (e, editedInput, editedInputId, setEditing) => {
    if (e.key === "Enter") {
      const response = await fetch("http://localhost:4000/edit", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({text: editedInput, _id: editedInputId  }),
    });


    fetchAllTasks()

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
        // allAreInComplete={allAreInComplete}
      />
      {/* <Footer setFilter={setFilter} /> */}
    </div>
  );
}

export default App;
