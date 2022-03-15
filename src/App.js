import "./App.css";
import Todos from "./Todos";
import { useState } from "react";
import { useEffect, createContext } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import ProtectedRoutes from "./ProtectedRoutes";

// import 'bootstrap/dist/css/bootstrap.min.css';

export const AuthContext = createContext(null)

function App() {
  let [todos, setTodos] = useState([]);
  let [input, setInput] = useState("");
  let [filter, setFilter] = useState("ALL");
  let [itemsLeft, setItemsLeft] = useState(null);
  let [token, setToken] = useState(localStorage.getItem('token') || null)
  let [isSignedIn, setIsSignedIn] = useState(false)

  const navigate = useNavigate();

  const localToken = localStorage.getItem('token')
  let storageToken = localStorage.getItem('token')


  // useEffect(() => {
  //   setToken(localStorage.getItem('token') || null)
  // }, [localToken])

  // const handleSignin = (storageTokenFromLogin) => {
  //   setToken(storageTokenFromLogin)
  //   console.log('token after signin in App: ', token)
  // }


  const handleSignout = () => {
    console.log('we are in handleSignout in App.js')
    localStorage.removeItem('token')
    setToken(null)
    setIsSignedIn(false)
    
    navigate('/')
    
  }


  


  // useEffect(() => {
   
  //   console.log('token in useffect of APP.js: ', storageToken)
  //   if(storageToken) {
  //     setIsSignedIn(true)
  //     setToken(storageToken)
  //   } else {
  //     setIsSignedIn(false)
  //     setToken(null)
  //   }
    
  // }, [storageToken])

  // useEffect(() => {
  //   let localToken = localStorage.getItem('token')
  //       setToken(localToken)
  //       console.log('token in first useefect: ', token)
  // },[])

  useEffect(() => {
    console.log('token is: ', token)
  }, [token])


  useEffect(() => {
    const fetchData = async () => { 
      // let localToken = localStorage.getItem('token')
      // console.log('localToken in first useefect: ', localToken)
      // setToken(localToken)
     console.log('What is token in fetchData: ', token)
     console.log('I fire once ')

    
      if(token) {
        try {
          const getAll = await fetch("http://localhost:4000/all", {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
            }
          });
          
          
            
            const allTasks = await getAll.json();
            setTodos(allTasks);
          
         } catch (error) {
           console.log("try catch error",error)
         }
      }
     
   
      
    
    }
    fetchData()
    
  }, [token]);

  const fetchAllTasks = async () => {
    const getAll = await fetch("http://localhost:4000/all", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    });
    const allTasks = await getAll.json();
    setTodos(allTasks);
  }

  const addInput = async (input) => {
    const response = await fetch("http://localhost:4000/save", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ text: input, completed: false }),
    });
    const jresponse = await response.json()
    setTodos(jresponse)

   
  };

  const completeTodo = async (completeId) => {
    const response = await fetch("http://localhost:4000/completeone", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
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
        "Authorization": "Bearer " + token
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
        "Authorization": "Bearer " + token
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

    const response = await fetch("http://localhost:4000/completeall", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
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
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({text: editedInput, _id: editedInputId  }),
    });


    fetchAllTasks()

    setEditing(false);      
    }
  };

  

  useEffect(() => {
    const activeTodos = todos.filter((todo) => !todo.complete);
    setItemsLeft(activeTodos.length);
  }, [todos]);

  return (
    
    <div className="app">
    <AuthContext.Provider value={token}>
      <Routes>
          <Route path="/" element={<Login setToken={setToken} setIsSignedIn={setIsSignedIn} isSignedIn={isSignedIn}  />} />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route path="/todos" element={
          <ProtectedRoutes>
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
        setIsSignedIn={setIsSignedIn} 
        isSignedIn={isSignedIn}
        setToken={setToken}
        handleSignout={handleSignout}
        token={token}
        /></ProtectedRoutes>}
        />
        </Routes>

      {/* <Todos
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
      <Footer setFilter={setFilter} /> */}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
