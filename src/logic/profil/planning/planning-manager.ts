import type { PlanningType } from './planning-type'
import { isGoodSchedule } from '~/logic/pages/login/planning.login'

export const isValidPlanning = (planning: PlanningType | undefined): boolean => {
  return !!planning && isGoodSchedule(planning.map(schedule => schedule.times))
}

interface ScheduleTime { start: string; end: string; statut: string }

type Schedule = ScheduleTime[][]

const detailedTimes = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00']

export const getFreeTimes = (schedule: Schedule, restricted: boolean): Schedule => {
  const newDays = []
  for (const day of schedule) {
    const newDay = []
    for (const time of day) {
      if (!(time.start.endsWith(':00') || time.start.endsWith(':30')) || !(time.end.endsWith(':00') || time.end.endsWith(':30')))
        continue
      if (time.statut === 'buisy' || (time.statut === 'tutorat' && restricted))
        continue
      newDay.push(time)
    }
    newDays.push(newDay)
  }
  return newDays
}
export const getSeparatedTimes = (schedule: Schedule): Schedule => {
  const newDays = []
  for (const day of schedule) {
    let newDay: ScheduleTime[] = []
    for (const time of day) {
      const sTimes = detailedTimes.reduce((p, c) => {
        if (p.passEnd)
          return p
        if (c === time.start && !p.passStart) {
          p.array.push(<never>c)
          return { ...p, passStart: true }
        }
        if (!p.passStart)
          return p
        p.array.push(<never>c)
        if (c !== time.end)
          return p
        return { ...p, passEnd: true }
      }, { passStart: false, passEnd: false, array: [] })
      sTimes.array.pop()

      newDay = [...newDay, ...(<{ passStart: boolean; passEnd: boolean; array: [] }>sTimes).array.map((v) => {
        return { start: v, end: detailedTimes[detailedTimes.indexOf(v) + 1], statut: time.statut }
      })]
    }
    newDays.push(newDay)
  }
  return newDays
}

export const getSameTimes = (userSchedule: Schedule, publicUserSchedule: Schedule, restricted = false) => {
  const freeUTime = getSeparatedTimes(getFreeTimes(userSchedule, restricted))
  const freePTime = getSeparatedTimes(getFreeTimes(publicUserSchedule, true))
  const newDays = []
  for (const [i, userDay] of freeUTime.entries()) {
    const newDay = []
    const pUserDay = freePTime[i]
    for (const userTime of userDay) {
      for (const pUserTime of pUserDay) {
        if (userTime.start === pUserTime.start && userTime.end === pUserTime.end)
          newDay.push(userTime)
      }
    }
    newDays.push(newDay)
  }
  return newDays
}

export const hasSameTimes = (userSchedule: Schedule, publicUserSchedule: Schedule): boolean => {
  const sameTimes = getSameTimes(userSchedule, publicUserSchedule)
  for (const day of sameTimes)
    if (day.some(day => day.statut === 'free')) return true
  return false
}
