const API_URL = import.meta.env.VITE_API_URL

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  }
}

export async function getTodos() {
  const res = await fetch(`${API_URL}/todos`, { headers: authHeaders() })
  if (!res.ok) return []
  return res.json()
}

export async function createTodo(title) {
  const user_id = localStorage.getItem('user_id')
  await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ user_id, title }),
  })
}

export async function toggleTodo(id, done) {
  await fetch(`${API_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ done }),
  })
}

export async function deleteTodo(id) {
  await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
}
