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
import { convsCache, getFirstConvId, initConvs } from './logic/data/firestore/datas/Conversations'
import type { User } from './logic/data/auth/User'

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

export const firstConv = ref('')

if (!['/', '/terms', '/contact', '/about-us', '/faq'].includes(window.location.pathname)) {
  const i1 = setInterval(async() => {
    if (!user.value || !user.value.exist || !user.value.valid) {
      await softLogin()
      if (!user.value || !user.value.exist || !user.value.valid) {
        isLoading.value = false
        window.open(`${window.location.origin}/login`)
        clearInterval(i1)
        setTimeout(() => {
          login()
        }, 1000)
      }
    }
    else {
      clearInterval(i1)
      initConvs()
      const i2 = setInterval(() => {
        if (convsCache && convsCache.get(getFirstConvId())) {
          isLoading.value = false
          clearInterval(i2)
        }
      }, 1000)
    }
  }, 1000)
}
else {
  isLoading.value = false
}
