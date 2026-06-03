<template>
  <div class="min-h-screen bg-gradient-to-br from-[#42b883] via-emerald-500 to-[#35495e] flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur rounded-2xl mb-4">
          <span class="text-3xl">🚀</span>
        </div>
        <h1 class="text-3xl font-bold text-white">Créer un compte</h1>
        <p class="text-emerald-100 mt-1">Commencez à organiser vos tâches</p>
      </div>

      <div class="bg-white rounded-3xl shadow-2xl p-8">
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="vous@exemple.com"
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#42b883] focus:border-transparent transition text-gray-800 placeholder-gray-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#42b883] focus:border-transparent transition text-gray-800 placeholder-gray-400"
            />
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
            {{ error }}
          </div>

          <button
            type="submit"
            class="w-full py-3 px-4 bg-gradient-to-r from-[#42b883] to-[#35495e] text-white font-semibold rounded-xl hover:opacity-90 transition transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-emerald-200"
          >
            S'inscrire
          </button>
        </form>

        <p class="text-center text-sm text-gray-500 mt-6">
          Déjà un compte ?
          <RouterLink to="/login" class="text-[#42b883] font-semibold hover:text-emerald-700">
            Se connecter
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../api/auth'

const email = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()

async function handleSubmit() {
  error.value = null
  const result = await register(email.value, password.value)
  if (result.error) {
    error.value = result.error
  } else {
    router.push('/login')
  }
}
</script>
