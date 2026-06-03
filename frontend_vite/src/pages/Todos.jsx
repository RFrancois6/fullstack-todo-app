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

  const done = todos.filter((t) => t.done).length
  const total = todos.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <h1 className="text-xl font-bold text-white">Mes Todos</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition"
          >
            <span>Déconnexion</span>
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Progress card */}
        {total > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-600">Progression</span>
              <span className="text-sm font-semibold text-violet-600">{done}/{total} tâches</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-violet-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: total > 0 ? `${(done / total) * 100}%` : '0%' }}
              />
            </div>
          </div>
        )}

        {/* Add form */}
        <form onSubmit={handleAdd} className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ajouter une nouvelle tâche..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition text-gray-800 placeholder-gray-400 bg-white shadow-sm"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-violet-200 whitespace-nowrap"
          >
            + Ajouter
          </button>
        </form>

        {/* Todo list */}
        {todos.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">📋</div>
            <p className="font-medium">Aucune tâche pour l'instant</p>
            <p className="text-sm mt-1">Ajoutez votre première tâche ci-dessus !</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border transition group ${
                  todo.done ? 'border-gray-100 opacity-60' : 'border-gray-100 hover:border-violet-200 hover:shadow-md'
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!todo.done}
                  onChange={() => handleToggle(todo)}
                  className="w-5 h-5 rounded-md accent-violet-600 cursor-pointer flex-shrink-0"
                />
                <span
                  className={`flex-1 text-gray-800 transition ${
                    todo.done ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition text-xl leading-none"
                  title="Supprimer"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* All done message */}
        {total > 0 && done === total && (
          <div className="text-center py-4">
            <p className="text-violet-600 font-semibold">🎉 Toutes les tâches sont terminées !</p>
          </div>
        )}
      </main>
    </div>
  )
}
