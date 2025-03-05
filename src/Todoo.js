import React, { useEffect, useState } from 'react';
import service1 from './service1.js';
import { Button, Link, Stack } from '@mui/material';

function Todoo() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [ok, setOk] = useState(false);

  //שליפת המשימות ע"פ מ.ז
  async function getTodos() {
    if (service1.getLoginUser()) {
      const to = await service1.byId(service1.getLoginUser().id)
      console.log(service1.getLoginUser().id);
      await setTodos(to.data);
    }
    else{
    const to = await service1.byId(1)
    }
  }
  //יצירת משימה
  async function createTodo(e) {
    e.preventDefault();
    await service1.addTask(newTodo);
    setNewTodo("");
    await getTodos();
  }
  //עדכון משימה
  async function updateCompleted(todo, isComplete) {
    await service1.setCompleted(todo.id, isComplete);
    await getTodos();
  }
  //מחיקת משימה
  async function deleteTodo(id) {
    await service1.deleteTask(id);

    await getTodos();
  }
  //בתחילה שולף את כל המשימות
  useEffect(() => {
   
      getTodos();
    
  }, []);
  // אם המשתמש מחובר הוא מציג לו רשימות אחרת מציג לו הודעה
  return <>
     <div>
      <section className="todoapp">
        <header className="header">
          <h1 style={{color:'#194350',fontSize:'5rem',textAlign:'center',padding:'0',marginBottom:'0.9rem'}}>todos</h1>
          <form  onSubmit={createTodo}>
            <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
            <br></br>
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
    </div>
    {/* {!ok &&
    <div>
      <div className="">
                  <h1 style={{color:'#194350',fontSize:'3rem',textAlign:'center',marginTop:'12rem'}}>
        אתה לא מחובר - להצגת המשימות הרשם כעת</h1>
      </div>
              <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <br>
              </br>
              <Link href="/login" style={{ textDecoration: "none" }}>
                <Button style={{backgroundColor:'#4D4D4D',color:'white'}} variant="outlined">התחברות</Button>
              </Link>
              <Link href="/register" style={{ textDecoration: "none" }}>
                <Button style={{backgroundColor:'#4D4D4D',color:'white'}} variant="contained">הרשמה</Button>
              </Link>
            </Stack>
            </div>} */}
  </>


}
export default Todoo;


