import React, { useEffect, useState } from 'react';
import service from './Service.js';

function User() {
  const [newTodo, setNewTodo] = useState("");
  const [newUser, setNewUser] = useState({});
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    const todos = await service.getTasks();
    setTodos(todos);
  }
  async function createUser(e) {
    e.preventDefault();
    await service.addUser(newUser);
    setNewTodo({});//clear input
  }
  async function createTodo(e) {
    e.preventDefault();
    await service.addTask(newTodo);
    setNewTodo("");
    await getTodos();//refresh tasks list (in order to see the new one)
  }

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete);
    await getTodos();//refresh tasks list (in order to see the updated one)
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    
    await getTodos();//refresh tasks list
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Sign in</h1>
        <form onSubmit={createUser}>
          <input className="new-todo" placeholder="Your Name..." value={newTodo} onChange={(e) => setNewUser({ ...newUser, name: e.target.value})} />
          <input className="new-todo" placeholder="Your Id.." value={newTodo} onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}/>
          <input className="new-todo" placeholder="Your Password..." value={newTodo} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}/>
          <input className="new-todo" type='sumbit'  />

        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section >
  );
}

export default User;