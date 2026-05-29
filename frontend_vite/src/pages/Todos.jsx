import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTodos, createTodo, toggleTodo, deleteTodo } from '../api/todos'
import { logout } from '../api/auth'

export default function Todos() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
      return
    }
    getTodos().then(setTodos)
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    if (!input.trim()) return
    await createTodo(input.trim())
    setInput('')
    setTodos(await getTodos())
  }

  async function handleToggle(todo) {
    await toggleTodo(todo.id, !todo.done)
    setTodos(await getTodos())
  }

  async function handleDelete(id) {
    await deleteTodo(id)
    setTodos(todos.filter((t) => t.id !== id))
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <div>
        <h1>Mes todos</h1>
        <button onClick={handleLogout}>Déconnexion</button>
      </div>

      <form onSubmit={handleAdd}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nouvelle tâche..."
        />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={!!todo.done}
              onChange={() => handleToggle(todo)}
            />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            <button onClick={() => handleDelete(todo.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
