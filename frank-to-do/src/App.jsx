import { useState } from 'react'
import Counter from './Counter';
import Techdetails from './Techdetails';
import './App.css'
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [todos, setTodos] = useLocalStorage('todoapp', []);
  const [showOpen, setShowOpen] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('');

  const toggleOpen = () => setShowOpen(!showOpen);

  const toggleDone = (id) => {
    setTodos((todos) => 
        todos.map((todo) => 
          (todo.id == id) ? {...todo, done: !todo.done} : todo
    ));
  };

  // handle input element for new todo
  const handleChange = (event) => setNewTodo(event.target.value);

  // handle input of filter string
  const handleFilter = (event) => setFilter(event.target.value);

  const addTodo  = (text) => {
    const id = parseInt(Math.random() * 500, 10);
    setTodos((previous) =>
      (text.length > 0) ? [...previous, {id:id, text:text, done:false, fadeOut: false}] : previous
    );
    setNewTodo(''); // clear input field
  }

  const removeTodo = (id) => {
    setTodos((previous) =>
      previous.map((todo) => 
       ((id == todo.id) ? {...todo, fadeOut: true} : todo)
      ));
    
    setTimeout(() =>
      setTodos(todos.filter((todo)=> todo.id !== id))
    , 500); 
  }

  // todo delete ALL done todos
  const removeAll = () => {
    // let all todos fade out with css class
    setTodos((previous) =>
      previous.map((todo) => 
       ( {...todo, fadeOut: true} )
      ));

    // empty the complete todos array
    setTimeout(() =>
      setTodos([]), 500);
  }

  const filteredTodos = (filter !== '') ? todos.filter(
    (todo) => todo.text.includes(filter) 
  ) : todos;

  return (
    <>
      <div className='flex flex-col min-w-[360px] md:min-w-[900px] p-2 md:p-4 bg-white rounded-md shadow-md'>
        <h1 className='animate-fade-in pb-4 md:pb-8 block text-grey-800 font-mono text-2xl md:text-5xl'>todo app</h1>
        <div className='p-2 flex flex-row gap-4 justify-center bg-blue-100'>
          <label><button className='shadow-md bg-green-400 p-2 md:px-5' onClick={toggleOpen} aria-label="filter todos">{showOpen ? 'show all' : 'show open'}</button></label>
          <Counter todos={todos} />
        </div>
        <div className='bg-blue-100 p-2'>
          <label>Filter Todos: </label>
          <input type='text' value={filter} onChange={handleFilter} className='p-2 border-2 border-solid border-blue-200 hover:border-blue-400 mb-4 mr-4 shadow-inner rounded-md'></input>
        </div>
        <div className='p-2 flex bg-blue-100'>
          {todos.length == 0 &&  
            <div className='flex flex-row w-full items-center p-2 bg-blue-100'>No Todos yet</div>
          }
          <div id="todolist" className='w-full grid grid-cols-1 md:grid-cols-2 p-2 gap-4'>
            { filteredTodos && filteredTodos.filter((todo)=> (showOpen && !todo.done) || !showOpen).map((todo) => (
                <div key={todo.id} className={(todo.fadeOut ? 'fade-out' : '')}>
                  <div className='flex flex-row justify-between items-center bg-white p-2 mb-2'>
                    <span>{todo.text}</span>
                    <div className='flex flex-row items-center gap-4'>
                      <input className='w-[30px] h-[30px]' type='checkbox' checked={todo.done} value={newTodo} onChange={()=>{toggleDone(todo.id)}} />
                      <button className='bg-red-200 hover:bg-red-300 py-1 px-2 text-base' onClick={()=>removeTodo(todo.id)} aria-label="delete todo">X</button>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
          <div className='mt-8 flex items-center justify-between'>
            <div>
              <input onChange={handleChange} className='p-[11px] border-2 border-solid border-blue-200 hover:border-blue-400 mb-4 mr-4 shadow-inner rounded-md' value={newTodo} type='text' placeholder='new todo' aria-label="enter new tdo text"/>  
              <button onClick={()=>addTodo(newTodo)} className='shadow-md bg-green-400 p-2 md:px-5' aria-label=" add new todo">Add</button>
          </div>
          <div>
            <button onClick={removeAll} className='bg-red-200 hover:bg-red-300 py-1 p-2 text-base'>Delete All</button>
          </div>
          </div>
      </div>
      <Techdetails />
    </>
  );
}

export default App
