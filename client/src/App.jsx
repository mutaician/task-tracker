import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"


function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const ApiURl = "http://localhost:5000/tasks/"

  const fetchTasks = () => {
    axios.get(ApiURl)
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = () => {
    if (newTask.trim() === '') return
    axios.post(ApiURl,{title: newTask})
      .then(() => {
        fetchTasks()
      })
      .catch(err => console.error(err))
    setNewTask('')
  }

  const toggleTask = (currentTask) => {
    axios.put(`${ApiURl}${currentTask._id}`, {done: !currentTask.done})
      .then(() => {
        fetchTasks()
      })
      .catch(err => console.error(err))
  }

  const deleteTask = (task) => {
    axios.delete(`${ApiURl}${task._id}`)
      .then(() => {
        fetchTasks()
      })
      .catch(err => console.error(err))
  }

  return(
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4" >Task Tracker</h1>

      <div className="flex gap-2 mb-4">
        <input type="text" 
          name="addtask" 
          id="addtask"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? addTask() : null}
          className="flex-1 p-2 border rounded focus:border-blue-500 focus:outline-none"
          placeholder="Add a task..."
           />
        <button
          onClick={addTask}
          className="bg-green-500 text-white p-2 px-6 rounded shadow hover:shadow-green-500/50"
        >
          Add</button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task._id} className="p-2 bg-gray-300 rounded text-gray-800 flex justify-between items-center">
            <div 
              className="flex items-center gap-2 "
              >
                <span
                  className={task.done ? "line-through text-gray-500 transition-all duration-200" : "text-gray-800 transition-all duration-200"}
                >{task.title}</span>
              <input type="checkbox"
                checked={task.done} 
                className="w-4 h-4 accent-blue-500 hover:ring-2 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={() => toggleTask(task)}/>
            </div>
            <button
              onClick={() => deleteTask(task)}
              className="text-red-600 hover:text-red-800 "
            >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}


export default App