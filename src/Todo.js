import React from 'react'
import  { useState, useEffect } from 'react';


export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [input, setInput] = useState('');
    useEffect(()=>{
       const savedtodos= JSON.parse(localStorage.getItem(todos));
       if (savedtodos){
         setTodos(savedtodos);}
    },[]);
    
    useEffect(()=>{
            localStorage.setItem('todos', JSON.stringify(todos));
          }, [todos]);
    const addTodo=(e)=>{
        e.preventDefault();
        if (input.trim()==="")return;
        setTodos([...todos,{text:input,completed:false}]);
        setInput("");
    }
    const toggleComplete=(index)=>{
        const updatedtodo=todos.map((todo,i)=>
            i===index?{...todo,completed:!todo.completed}:todo
    );
    setTodos(updatedtodo)
    };
    const deleteTodo=(index=>{
        const updatedtodo=todos.filter((_,i)=>i!==index);
        setTodos(updatedtodo)
    });
    const filteredTodos=todos.filter((todo)=>{
        if (filter === 'completed') return todo.completed;
        if (filter === 'incomplete') return !todo.completed;
        return true;
    });
    

  return (
   
    <div className="App">
    <h1>Todo List</h1>

    <form onSubmit={addTodo}>
      <input
        type="text"
        placeholder="Enter a task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>

    <div className="filters">
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
      <button onClick={() => setFilter('incomplete')}>Incomplete</button>
    </div>

    <ul>
      {filteredTodos.map((todo, index) => (
        <li key={index} className={todo.completed ? 'completed' : ''}>
          {todo.text}
          <button onClick={() => toggleComplete(index)}>
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => deleteTodo(index)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
  
);
}