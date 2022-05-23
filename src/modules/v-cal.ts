import VueCal from 'vue-cal'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.component('VCal', VueCal)
}
