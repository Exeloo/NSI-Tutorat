import type { PartialSchoolPreferencesType } from './school-type'
import type { Option } from '~/logic/pages/login/school.login'
import { selectOptions } from '~/logic/pages/login/school.login'

export const isValidChoices = (choices?: PartialSchoolPreferencesType) => {
  if (!choices) return false
  const hasLevel = !!choices.level
  const hasClasse = !!choices.class
  const hasLv = !!choices.lv?.a && !!choices.lv.b
  const hasDnl = choices.section?.lang !== 'angl-euro' || !!choices.section.dnl || choices.class === 'seconde'

  const needSpe = choices.level && ['premiere-g', 'terminal-g'].includes(choices.level)
  const hasSpe = !needSpe || (!!choices.spe?.a && !!choices.spe.b && !!choices.spe.c)

  const needTech = choices.level && ['premiere-t', 'terminal-t'].includes(choices.level)
  const hasTech = !needTech || !!choices.techno

  const hasHelperSubjects = !choices.tutorat?.helper?.wish || choices.tutorat?.helper?.subjects?.length !== 0
  const hasReceiverSubjects = !choices.tutorat?.receiver?.wish || choices.tutorat?.receiver?.subjects?.length !== 0
  const hasSubjects = hasHelperSubjects && hasReceiverSubjects

  const askHelpOrReceive = !!choices.tutorat?.helper?.wish || !!choices.tutorat?.receiver?.wish

  return hasLevel && hasClasse && hasLv && hasDnl && hasSpe && hasTech && hasSubjects && askHelpOrReceive
}

const getLabelFromValue = (array: Array<Option>, id: string): string => {
  return array.filter((e: Option) => e.value === id).map((e: Option) => e.label)[0]
}

export const getSchoolName = (category: string, id: string, option?: string) => {
  const selectCat = selectOptions[category]
  if (option) {
    if (selectCat instanceof Map)
      return getLabelFromValue(selectCat.get(<string>option), id)
    else
      return getLabelFromValue(selectCat[option], id)
  }
  return getLabelFromValue(selectCat, id)
}
