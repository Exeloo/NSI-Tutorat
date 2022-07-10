export const getMinFormTime = (time: string) => {
  return (<number[]><unknown>time.split(':'))[0] * 60 + (<number[]><unknown>time.split(':'))[1] * 1
}

export const getMinFormTimes = (array: { start: string; end: string; statut: string }[]) => {
  const newArray = []
  for (const e of array)
    newArray.push([getMinFormTime(e.start), getMinFormTime(e.end)])
  return newArray
}

export const hasEnoughRange = (start: number, end: number) => {
  return end - start - 30 >= 0
}

export const isGoodSchedule = (schedule: { start: string; end: string; statut: string }[][]): boolean => {
  let isCompleted = false
  for (const list of schedule) {
    if (list.length === 0) continue
    isCompleted = true
    for (const item of list)
      if (!item.start || !item.end || !['free', 'buisy', 'tutorat'].includes(item.statut) || !hasEnoughRange(getMinFormTime(item.start), getMinFormTime(item.end))) return false

    const tempList = getMinFormTimes(list).sort((a, b) => a[0] - b[0])
    const buisyList = [tempList[0]]
    for (let i = 1; i < tempList.length; i++) {
      if (buisyList[buisyList.length - 1][1] === tempList[i][0])
        buisyList[buisyList.length - 1][1] = tempList[i][1]
      else if (buisyList[buisyList.length - 1][1] > tempList[i][0])
        return false
      else
        buisyList.push(tempList[i])
    }
    if (buisyList[0][0] < 7 * 60 || buisyList[buisyList.length - 1][1] > 19 * 60) return false
  }
  return isCompleted
}
