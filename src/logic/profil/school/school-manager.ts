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

const labels = new Map([
  ['seconde', 'Seconde Générale et Technologique'],
  ['premiere-g', 'Première Générale'],
  ['premiere-t', 'Première Technologique'],
  ['terminal-g', 'Terminale Générale'],
  ['terminal-t', 'Terminale Technologique'],
  ['2nd1', '2nd1'],
  ['2nd2', '2nd2'],
  ['2nd3', '2nd3'],
  ['2nd4', '2nd4'],
  ['2nd5', '2nd5'],
  ['2nd6', '2nd6'],
  ['2nd7', '2nd7'],
  ['2nd8', '2nd8'],
  ['2nd9', '2nd9'],
  ['1g1', '1G1'],
  ['1g2', '1G2'],
  ['1g3', '1G3'],
  ['1g4', '1G4'],
  ['1g5', '1G5'],
  ['1g6', '1G6'],
  ['1stl', '1STL'],
  ['1std2a', '1STD2A'],
  ['tg1', 'TG1'],
  ['tg2', 'TG2'],
  ['tg3', 'TG3'],
  ['tg4', 'TG4'],
  ['tg5', 'TG5'],
  ['tg6', 'TG6'],
  ['tstl', 'TSTL'],
  ['tstd2a', 'TSTD2A'],
  ['art-spe', 'Art'],
  ['geopo-spe', 'Histoire-Géographie], Géopolitique et Science Poilitique'],
  ['hlp-spe', 'Humanité], Littérature et Philosophie'],
  ['llce-spe', 'Langues], Littératures et Cultures Etrangère'],
  ['llca-spe', 'Littératures], Langues et Cultures de l\'Antiquité'],
  ['maths-spe', 'Mathématiques'],
  ['nsi-spe', 'Numérique et Science de l\'Informatique'],
  ['pc-spe', 'Physique-Chimie'],
  ['svt-spe', 'Science de la Vie et de la Terre'],
  ['ses-spe', 'Science Economique et Sociales'],
  ['std2a', 'STD2A'],
  ['stl', 'STL'],
  ['alld-lv', 'Allemand'],
  ['angl-lv', 'Anglais'],
  ['esp-lv', 'Espagnol'],
  ['droit-opt', 'Droit'],
  ['art-opt', 'Art'],
  ['maths-expert-opt', 'Mathématiques Expertes'],
  ['maths-compl-opt', 'Mathématiques Complémentaires'],
  ['chinois-opt', 'Chinois'],
  ['alld-euro', 'Allemand'],
  ['angl-euro', 'Anglais'],
  ['esp-euro', 'Espagnol'],
  ['eps-dnl', 'Education Physique et Sportive'],
  ['hist-dnl', 'Histoire-Géographie'],
  ['maths-dnl', 'Mathématiques'],
  ['fr', 'Français'],
  ['maths', 'Mathématiques'],
  ['pc', 'Physique-Chimie'],
  ['ses', 'Sciences Economique et Sociale'],
  ['snt', 'Sciences Numérique et Technologique'],
  ['svt', 'Sciences de la Vie et de la Terre'],
  ['es', 'Enseignement Scientifique'],
  ['philo', 'Philosophie'],
  ['emc', 'Enseignement Morale et Civique'],
  ['eps', 'Education Physique et Sportive'],
  ['hist', 'Histoire-Géographie'],
  ['m', 'Masculin'],
  ['f', 'Féminin'],
  ['n', 'Non Précisé'],
])

export const getSchoolLabel = (id: string) => {
  return labels.has(id) ? labels.get(id) : id
}
