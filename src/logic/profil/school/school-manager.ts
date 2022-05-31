import type { PartialSchoolPreferencesType } from './school-type'

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
