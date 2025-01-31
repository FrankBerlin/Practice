import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    {id:1, text:"first todo", done:false},
    {id:2, text:"another todo", done:true}
  ]);
  const [showOpen, setShowOpen] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  const toggleOpen = () => setShowOpen(!showOpen);

  const toggleDone = (id) => {
    setTodos((todos) => 
        todos.map((todo) => 
          (todo.id == id) ? {...todo, done: !todo.done} : todo
    ));
  };

  const handleChange = (event) => setNewTodo(event.target.value);

  // todo add a unique id to the new todo
  const addTodo  = (text) => {
    setTodos((previous) =>
      (text.length > 0) ? [...previous, {id:5, text:text, done:false}] : previous
    );
    setNewTodo('');
  }

  return (
    <>
      <div className='flex flex-col min-w-[360px] md:min-w-[800px] p-2 md:p-4 bg-white rounded-md shadow-md'>
        <h1 className='pb-8 block text-grey-800'>Todo App</h1>
        <div className='p-2 flex flex-row gap-2 justify-center bg-blue-100'>
          <label><button className='shadow-md' onClick={toggleOpen}>{showOpen ? 'show all' : 'show open'}</button></label>
        </div>
        <div className='p-2 flex bg-blue-100'>
          <ul id="todolist" className='w-full'>
            { todos && todos.map((todo) => (
                <li key={todo.id}>
                  <div className='flex flex-row justify-between bg-white p-2 mb-2'>
                    <span>{todo.text}</span>
                    <input className='w-[30px]' type='checkbox' checked={todo.done} value={newTodo} onChange={() => {toggleDone(todo.id)}} />
                  </div>
                </li>
            ))}
            <li className='mt-8'>
              <input onChange={handleChange} className='p-[11px] mb-4 mr-4 shadow-inner rounded-md w-4/6' value={newTodo} type='text' placeholder='new todo'/>
              <button onClick={()=>addTodo(newTodo)} className='shadow-md bg-green-400 w-1/6'>Add</button>
            </li>
          </ul>
        
        </div>

      </div>
    </>
  )
}

export default App
