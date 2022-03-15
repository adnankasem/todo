import React, { useEffect } from "react";
import Footer from "./Footer";
import Input from "./Input";
import Todo from "./Todo";
import {useNavigate} from 'react-router-dom'
import { useContext } from "react";
import {AuthContext} from './App'
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
  setIsSignedIn,
  isSignedIn,
  setToken,
  handleSignout,
  
}) {

  

  const token = useContext(AuthContext)

  const navigate = useNavigate();
  const myStorageToken = localStorage.getItem('token')

  // useEffect(() => {
  //   if(!token) {
  //     alert('You  are not logged in!!')
  //     navigate('/')
  //    }
  //   console.log('token in Todos useeffect: ', token)
  // }, [token])
  

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
    <>
    {
      token && <button type='button' onClick={handleSignout}>Signout</button>
    }
    
    <h1 className="app-heading">todos</h1>
    
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
    </>
  );
}

export default Todos;
