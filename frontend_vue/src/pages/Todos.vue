<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg">
      <div class="max-w-2xl mx-auto px-4 py-5 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-2xl">✅</span>
          <h1 class="text-xl font-bold text-white">Mes Todos</h1>
        </div>
        <button
          @click="handleLogout"
          class="flex items-center gap-2 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition"
        >
          Déconnexion
        </button>
      </div>
    </header>

    <main class="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <!-- Progress card -->
      <div v-if="todos.length > 0" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div class="flex justify-between items-center mb-3">
          <span class="text-sm font-medium text-gray-600">Progression</span>
          <span class="text-sm font-semibold text-violet-600">{{ doneCount }}/{{ todos.length }} tâches</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2.5">
          <div
            class="bg-gradient-to-r from-violet-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500"
            :style="{ width: progressWidth }"
          />
        </div>
      </div>

      <!-- Add form -->
      <form @submit.prevent="handleAdd" class="flex gap-3">
        <input
          v-model="input"
          placeholder="Ajouter une nouvelle tâche..."
          class="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition text-gray-800 placeholder-gray-400 bg-white shadow-sm"
        />
        <button
          type="submit"
          class="px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-violet-200 whitespace-nowrap"
        >
          + Ajouter
        </button>
      </form>

      <!-- Empty state -->
      <div v-if="todos.length === 0" class="text-center py-16 text-gray-400">
        <div class="text-5xl mb-4">📋</div>
        <p class="font-medium">Aucune tâche pour l'instant</p>
        <p class="text-sm mt-1">Ajoutez votre première tâche ci-dessus !</p>
      </div>

      <!-- Todo list -->
      <ul v-else class="space-y-3">
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border transition group"
          :class="todo.done ? 'border-gray-100 opacity-60' : 'border-gray-100 hover:border-violet-200 hover:shadow-md'"
        >
          <input
            type="checkbox"
            :checked="!!todo.done"
            @change="handleToggle(todo)"
            class="w-5 h-5 rounded-md accent-violet-600 cursor-pointer flex-shrink-0"
          />
          <span
            class="flex-1 text-gray-800 transition"
            :class="{ 'line-through text-gray-400': todo.done }"
          >
            {{ todo.title }}
          </span>
          <button
            @click="handleDelete(todo.id)"
            class="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition text-xl leading-none"
            title="Supprimer"
          >
            ×
          </button>
        </li>
      </ul>

      <!-- All done -->
      <div v-if="todos.length > 0 && doneCount === todos.length" class="text-center py-4">
        <p class="text-violet-600 font-semibold">🎉 Toutes les tâches sont terminées !</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTodos, createTodo, toggleTodo, deleteTodo } from '../api/todos'
import { logout } from '../api/auth'

const todos = ref([])
const input = ref('')
const router = useRouter()

const doneCount = computed(() => todos.value.filter((t) => t.done).length)
const progressWidth = computed(() =>
  todos.value.length > 0 ? `${(doneCount.value / todos.value.length) * 100}%` : '0%'
)

onMounted(async () => {
  if (!localStorage.getItem('token')) {
    router.push('/login')
    return
  }
  todos.value = await getTodos()
})

async function handleAdd() {
  if (!input.value.trim()) return
  await createTodo(input.value.trim())
  input.value = ''
  todos.value = await getTodos()
}

async function handleToggle(todo) {
  await toggleTodo(todo.id, !todo.done)
  todos.value = await getTodos()
}

async function handleDelete(id) {
  await deleteTodo(id)
  todos.value = todos.value.filter((t) => t.id !== id)
}

function handleLogout() {
  logout()
  router.push('/login')
}
</script>
