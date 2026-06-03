<template>
  <div class="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur rounded-2xl mb-4">
          <span class="text-3xl">✅</span>
        </div>
        <h1 class="text-3xl font-bold text-white">Bon retour !</h1>
        <p class="text-purple-200 mt-1">Connectez-vous à votre espace</p>
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
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition text-gray-800 placeholder-gray-400"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition text-gray-800 placeholder-gray-400"
            />
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
            {{ error }}
          </div>

          <button
            type="submit"
            class="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-violet-200"
          >
            Se connecter
          </button>
        </form>

        <p class="text-center text-sm text-gray-500 mt-6">
          Pas de compte ?
          <RouterLink to="/register" class="text-violet-600 font-semibold hover:text-violet-700">
            S'inscrire
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../api/auth'

const email = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()

async function handleSubmit() {
  error.value = null
  const result = await login(email.value, password.value)
  if (result.error) {
    error.value = result.error
  } else {
    router.push('/todos')
  }
}
</script>
