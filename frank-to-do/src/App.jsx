import { useState } from 'react'
import Counter from './Counter';
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
    const id = parseInt(Math.random() * 500, 10);
    setTodos((previous) =>
      (text.length > 0) ? [...previous, {id:id, text:text, done:false}] : previous
    );
    setNewTodo('');
  }

  return (
    <>
      <div className='flex flex-col min-w-[360px] md:min-w-[900px] p-2 md:p-4 bg-white rounded-md shadow-md'>
        <h1 className='pb-8 block text-grey-800 font-mono'>Todo App</h1>
        <div className='p-2 flex flex-row gap-2 justify-center bg-blue-100'>
          <label><button className='shadow-md' onClick={toggleOpen}>{showOpen ? 'show all' : 'show open'}</button></label>
          <Counter todos={todos} />
        </div>
        <div className='p-2 flex bg-blue-100'>
          <div id="todolist" className='w-full grid grid-cols-1 md:grid-cols-2 p-2 gap-4'>
            { todos && todos.filter((todo)=> (showOpen && !todo.done) || !showOpen).map((todo) => (
                <div key={todo.id}>
                  <div className='flex flex-row justify-between bg-white p-2 mb-2'>
                    <span>{todo.text}</span>
                    <input className='w-[30px]' type='checkbox' checked={todo.done} value={newTodo} onChange={() => {toggleDone(todo.id)}} />
                  </div>
                </div>
            ))}
          </div>
          </div>
          <div className='mt-8'>
            <input onChange={handleChange} className='p-[11px] border-2 border-solid border-blue-100 mb-4 mr-4 shadow-inner rounded-md' value={newTodo} type='text' placeholder='new todo'/>
            <button onClick={()=>addTodo(newTodo)} className='shadow-md bg-green-400'>Add</button>
          </div>
      </div>
    </>
  )
}

export default App
