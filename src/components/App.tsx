import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CheckCircle, Circle, Trash } from 'phosphor-react';
import { Header } from './Header';
import './App.css';

interface ITask {
  id: string;
  title: string;
  isComplete: boolean;
}

export function App() {
  const [task, setTask] = useState('');
  const [todoList, setTodoList] = useState<ITask[]>([]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    const newTask = {
        id: uuidv4(),
        title: task,
        isComplete: false,
      }

    setTodoList([newTask, ...todoList]);
    setTask('')
  }
  
  function handleChangeComplete(id: string) {
    const taskComplete = todoList.map((task) => {
      if (task.id === id) {
        return {...task, isComplete: !task.isComplete}
      }
      return task;
    })

    setTodoList(taskComplete)
  }

  function handleDeleteTask(id: string) {
    const filtered = todoList.filter(function(item) {
      return item.id !== id
    })

    setTodoList(filtered)
  }

  const result = todoList.reduce((a, item) => a + (item.isComplete === true ? 1 : 0), 0)

  return (
    <>
      <Header />

      <div className="wrapper">
        <form onSubmit={onSubmit}>
          <input 
            type="text" 
            name="todo" 
            placeholder="Adicione uma nova tarefa"
            value={task}
            onChange={(event) => {
              setTask(event.target.value)
            }}
            autoComplete="off"
          />
          <button className="btn-form" type="submit">Criar</button>
        </form>

        <div className="info">
          <p>Tarefas criadas <span>{todoList.length}</span></p>
          <p>Concluídas <span>{result} de {todoList.length}</span></p>
        </div>
        
        <ul>
          {todoList.map(todo => {
            return (
              <li key={todo.id} className={todo.isComplete ? 'task-complete' : 'task'}>
                <div>
                  <button 
                    onClick={() => {handleChangeComplete(todo.id)}}
                    className="toogle-complete"
                  >
                    {todo.isComplete ? <CheckCircle weight="fill" /> : <Circle />}
                  </button>
                  {todo.title}
                </div>
                <button 
                  onClick={() => {handleDeleteTask(todo.id)}}
                  className="delete"
                >
                  <Trash />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}