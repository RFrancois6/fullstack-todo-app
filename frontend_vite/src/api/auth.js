const API_URL = 'http://localhost:8080'

export async function login(email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) return { error: 'Email ou mot de passe incorrect' }
    const token = await res.json()
    localStorage.setItem('token', token)
    return { token }
  } catch {
    return { error: 'Erreur réseau' }
  }
}

export async function register(email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) return { error: "Erreur lors de l'inscription" }
    return {}
  } catch {
    return { error: 'Erreur réseau' }
  }
}

export function logout() {
  localStorage.removeItem('token')
}

export function getToken() {
  return localStorage.getItem('token')
}
