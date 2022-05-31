import type { SchoolPreferencesType } from '../../profil/school/school-type'

export interface Option { value: string; label: string }
interface Options {
  classe: undefined | Option[]
  spe: {
    a: Option[]
    b: Option[]
    c: Option[]
  }
  lv: {
    a: Option[]
    b: Option[]
  }
  option: undefined | Option[]
  section: Option[]
  subjects: {
    helper: undefined | Option[]
    receiver: undefined | Option[]
    good: undefined | Option[]
    bad: undefined | Option[]
  }
}

export const selectOptions = {
  niveau: [
    { value: 'seconde', label: 'Seconde Générale et Technologique' },
    { value: 'premiere-g', label: 'Première Générale' },
    { value: 'premiere-t', label: 'Première Technologique' },
    { value: 'terminal-g', label: 'Terminal Générale' },
    { value: 'terminal-t', label: 'Terminal Technologique' },
  ],
  classe: new Map([
    ['seconde', [
      { value: '2nd1', label: '2nd1' },
      { value: '2nd2', label: '2nd2' },
      { value: '2nd3', label: '2nd3' },
      { value: '2nd4', label: '2nd4' },
      { value: '2nd5', label: '2nd5' },
      { value: '2nd6', label: '2nd6' },
      { value: '2nd7', label: '2nd7' },
      { value: '2nd8', label: '2nd8' },
      { value: '2nd9', label: '2nd9' },
    ]],
    ['premiere-g', [
      { value: '1g1', label: '1G1' },
      { value: '1g2', label: '1G2' },
      { value: '1g3', label: '1G3' },
      { value: '1g4', label: '1G4' },
      { value: '1g5', label: '1G5' },
      { value: '1g6', label: '1G6' },
    ]],
    ['premiere-t', [
      { value: '1stl', label: '1STL' },
      { value: '1stdaa', label: '1STDAA' },
    ]],
    ['terminal-g', [
      { value: 'tg1', label: 'TG1' },
      { value: 'tg2', label: 'TG2' },
      { value: 'tg3', label: 'TG3' },
      { value: 'tg4', label: 'TG4' },
      { value: 'tg5', label: 'TG5' },
      { value: 'tg6', label: 'TG6' },
    ]],
    ['terminal-t', [
      { value: 'tstl', label: 'TSTL' },
      { value: 'tstdaa', label: 'TSTDAA' },
    ]],
  ]),
  spe: [
    { value: 'art-spe', label: 'Art' },
    { value: 'geopo-spe', label: 'Histoire-Géographie, Géopolitique et Science Poilitique' },
    { value: 'hlp-spe', label: 'Humanité, Littérature et Philosophie' },
    { value: 'llce-spe', label: 'Langues, Littératures et Cultures Etrangère' },
    { value: 'llca-spe', label: 'Littératures, Langues et Cultures de l\'Antiquité' },
    { value: 'maths-spe', label: 'Mathématiques' },
    { value: 'nsi-spe', label: 'Numérique et Science de l\'Informatique' },
    { value: 'pc-spe', label: 'Physique-Chimie' },
    { value: 'svt-spe', label: 'Science de la Vie et de la Terre' },
    { value: 'ses-spe', label: 'Science Economique et Sociales' },
  ],
  techno: [
    { value: 'sti2a', label: 'STI2A' },
    { value: 'stl', label: 'STL' },
  ],
  lv: [
    { value: 'alld-lv', label: 'Allemand' },
    { value: 'angl-lv', label: 'Anglais' },
    { value: 'esp-lv', label: 'Espagnol' },
  ],
  option: new Map([
    ['seconde', [
      { value: '?', label: '?' },
    ]],
    ['premiere-g', [
      { value: '?', label: '?' },
    ]],
    ['premiere-t', [
      { value: '?', label: '?' },
    ]],
    ['terminal-g', [
      { value: 'droit-opt', label: 'Droit ?' },
    ]],
    ['terminal-t', [
      { value: '?', label: '?' },
    ]],
    ['default', [
      { value: 'art-opt', label: 'Art' },
      { value: 'chinois-opt', label: 'Chinois' },
    ]],
  ]),
  section: {
    lang: [
      { value: 'alld-euro', label: 'Allemand' },
      { value: 'angl-euro', label: 'Anglais' },
      { value: 'esp-euro', label: 'Espagnol' },
    ],
    dnl: [
      { value: 'eps-dnl', label: 'Education Physique et Sportive' },
      { value: 'hist-dnl', label: 'Histoire-Géographie' },
      { value: 'maths-dnl', label: 'Mathématiques' },
    ],
  },
  subject: new Map([
    ['seconde', [
      { value: 'fr', label: 'Français' },
      { value: 'maths', label: 'Mathématiques' },
      { value: 'pc', label: 'Physique-Chimie' },
      { value: 'ses', label: 'Sciences Economique et Sociale' },
      { value: 'snt', label: 'Sciences Numérique et Technologique' },
      { value: 'svt', label: 'Sciences de la Vie et de la Terre' },
    ]],
    ['premiere-g', [
      { value: 'es', label: 'Enseignement Scientifique' },
      { value: 'fr', label: 'Français' },
    ]],
    ['premiere-t', [
      { value: 'fr', label: 'Français' },
      { value: 'maths', label: 'Mathématiques' },
    ]],
    ['terminal-g', [
      { value: 'es', label: 'Enseignement Scientifique' },
      { value: 'philo', label: 'Philosophie' },
    ]],
    ['terminal-t', [
      { value: 'maths', label: 'Mathématiques' },
      { value: 'philo', label: 'Philosophie' },
    ]],
    ['default', [
      { value: 'emc', label: 'Enseignement Morale et Civique' },
      { value: 'eps', label: 'Education Physique et Sportive' },
      { value: 'hist', label: 'Histoire-Géographie' },
    ]],
    ['stl', [
      { value: 'emc', label: 'Enseignement Morale et Civique' },
      { value: 'eps', label: 'Education Physique et Sportive' },
      { value: 'hist', label: 'Histoire-Géographie' },
    ]],
    ['sti2a', [
      { value: 'emc', label: 'Spécialité Analyse et Méthodes en Design' },
    ]],
  ]),
}

const getDefaultOptions = () => {
  const defaultOptions: Options = {
    classe: undefined,
    spe: {
      a: selectOptions.spe,
      b: selectOptions.spe,
      c: selectOptions.spe,
    },
    lv: {
      a: selectOptions.lv,
      b: selectOptions.lv,
    },
    option: undefined,
    section: selectOptions.section.lang,
    subjects: {
      helper: undefined,
      receiver: undefined,
      good: undefined,
      bad: undefined,
    },
  }
  return defaultOptions
}

export const models = reactive<{ value: SchoolPreferencesType }>({
  value: {
    level: '',
    class: '',
    spe: {
      a: '',
      b: '',
      c: '',
    },
    techno: '',
    lv: {
      a: '',
      b: '',
    },
    option: [],
    section: {
      lang: '',
      dnl: '',
    },
    subjects: {
      good: [],
      bad: [],
    },
    tutorat: {
      helper: {
        wish: false,
        subjects: [],
      },
      receiver: {
        wish: false,
        subjects: [],
      },
    },

  },

})

export const setModels = (data: SchoolPreferencesType) => {
  models.value = { ...models.value, ...data }
}

export const options = reactive(getDefaultOptions())
export const optionOptions = ref()

export const getOption = (niveau: string, spe: { a?: string; b?: string; c?: string } | undefined) => {
  const options = selectOptions.option.get(niveau)
  const defaultOptions = <Option[]>selectOptions.option.get('default')
  if (!options) return undefined
  const copyOptions = [...options]
  for (const defaultOption of defaultOptions)
    copyOptions.push(defaultOption)

  if (niveau === 'terminal-g' && spe) {
    if (spe.c === 'maths-spe')
      copyOptions.push({ value: 'maths-compl-opt', label: 'Mathématiques Complémentaires' })
    else if (spe.a === 'maths-spe' || spe.b === 'maths-spe')
      copyOptions.push({ value: 'maths-expert-opt', label: 'Mathématiques Expertes' })
  }
  return copyOptions
}

export const getSubjects = (models: SchoolPreferencesType) => {
  const options: Option[] = []
  const isTerminalG = models.level === 'terminal-g'

  const speSubjects = selectOptions.spe.filter((v: any) => {
    const isSpe = Object.values(models.spe).includes(v.value)
    const isLastSpe = models.spe.c === v.value
    const isLostSpe = isTerminalG && isLastSpe
    return isSpe && !isLostSpe
  })
  options.push(...speSubjects.map((e) => { return { ...e, label: `Spécialité ${e.label}` } }))

  const niveauSubjects = selectOptions.subject.get(models.level)
  const defaultSubjects = selectOptions.subject.get('default')
  if (!niveauSubjects || !defaultSubjects) return options
  options.push(...defaultSubjects, ...niveauSubjects)

  const lvSubjects = selectOptions.lv.filter((v: any) => Object.values(models.lv).includes(v.value))
  options.push(...lvSubjects)

  const niveauOptions = selectOptions.option.get(models.level)
  const defaultOptions = selectOptions.option.get('default')
  if (!niveauOptions || !defaultOptions) return options
  const optionSubjects = [...defaultOptions, ...niveauOptions].filter(
    opt => models.option.includes(opt.value),
  )
  options.push(...optionSubjects.map((e) => { return { ...e, label: `Option ${e.label}` } }))

  const sectionSubjects = selectOptions.section.lang.filter(
    section => models.section.lang === section.value,
  )
  options.push(...sectionSubjects.map((e) => { return { ...e, label: `Section Euro ${e.label}` } }))

  if (models.section.lang === 'angl-euro') {
    const dnlSubjects = selectOptions.section.dnl.filter(
      dnl => models.section.dnl === dnl.value,
    )
    options.push(...dnlSubjects.map((e) => { return { ...e, label: `DNL ${e.label}` } }))
  }

  return options
}
