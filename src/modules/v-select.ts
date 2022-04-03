import vSelect from 'vue-select'
import type { UserModule } from '~/types'
import 'vue-select/dist/vue-select.css'

export const install: UserModule = ({ app, router, isClient }) => {
  app.component('VSelect', vSelect)
}
