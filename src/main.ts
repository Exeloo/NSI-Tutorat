import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import './styles/layout.css'
import 'uno.css'
import { FirebaseSystem } from './logic/data/firebase-system'
import { login, softLogin, user } from './logic/data/auth/auth-manager'

const routes = setupLayouts(generatedRoutes)

FirebaseSystem()

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.(ctx))
  },
)

export const isLoading = ref(true)

let i: NodeJS.Timeout

const clearI = () => {
  clearInterval(i)
}
if (!['/', '/terms', '/contact', '/about-us', '/faq'].includes(window.location.pathname)) {
  i = setInterval(async() => {
    if (!user.value || !user.value.exist || !user.value.valid) {
      await softLogin()
      if (!user.value || !user.value.exist || !user.value.valid) {
        isLoading.value = false
        window.open(`${window.location.origin}/login`)
        clearI()
        setTimeout(() => {
          login()
        }, 1000)
      }
    }
    else {
      isLoading.value = false
      clearI()
    }
  }, 1000)
}
else {
  isLoading.value = false
}
