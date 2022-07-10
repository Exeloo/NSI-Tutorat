import type { PlanningType } from './planning-type'
import { isGoodSchedule } from '~/logic/pages/login/planning.login'

export const isValidPlanning = (planning: PlanningType | undefined): boolean => {
  return !!planning && isGoodSchedule(planning.map(schedule => schedule.times))
}
