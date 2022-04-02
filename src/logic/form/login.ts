
interface Option { value: string; label: string }
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
    { value: 'art', label: 'Art' },
    { value: 'geopo', label: 'Histoire-Géographie, Géopolitique et Science Poilitique' },
    { value: 'hlp', label: 'Humanité, Littérature et Philosophie' },
    { value: 'llce', label: 'Langues, Littératures et Cultures Etrangère' },
    { value: 'llca', label: 'Littératures, Langues et Cultures de l\'Antiquité' },
    { value: 'maths', label: 'Mathématiques' },
    { value: 'nsi', label: 'Numérique et Science de l\'Informatique' },
    { value: 'pc', label: 'Physique-Chimie' },
    { value: 'svt', label: 'Science de la Vie et de la Terre' },
    { value: 'ses', label: 'Science Economique et Sociales' },
  ],
  lv: [
    { value: 'alld', label: 'Allemand' },
    { value: 'angl', label: 'Anglais' },
    { value: 'esp', label: 'Espagnol' },
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
      { value: 'droit', label: 'Droit ?' },
    ]],
    ['terminal-t', [
      { value: '?', label: '?' },
    ]],
    ['default', [
      { value: 'chinois', label: 'Chinois' },
    ]],
  ]),
  section: {
    lang: [
      { value: 'alld', label: 'Allemand' },
      { value: 'angl', label: 'Anglais' },
      { value: 'esp', label: 'Espagnol' },
    ],
    dnl: [
      { value: 'eps', label: 'EPS' },
      { value: 'hist', label: 'Histoire-Géographie' },
      { value: 'maths', label: 'Mathématiques' },
    ],
  },
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
  }
  return defaultOptions
}

export const getOption = (niveau: string, spe: { a?: string; b?: string; c?: string } | undefined) => {
  const options = selectOptions.option.get(niveau)
  const defaultOptions = <Option[]>selectOptions.option.get('default')
  if (!options) return undefined
  const copyOptions = [...options]
  for (const defaultOption of defaultOptions)
    copyOptions.push(defaultOption)

  if (niveau === 'terminal-g' && spe) {
    if (spe.c === 'maths')
      copyOptions.push({ value: 'maths-compl', label: 'Mathématiques Complémentaires' })
    else if (spe.a === 'maths' || spe.b === 'maths')
      copyOptions.push({ value: 'maths-expert', label: 'Mathématiques Expertes' })
  }
  return copyOptions
}

export const models = reactive({
  niveau: '',
  classe: '',
  spe: {
    a: '',
    b: '',
    c: '',
  },
  lv: {
    a: '',
    b: '',
  },
  option: '',
  section: {
    lang: '',
    dnl: '',
  },
  goodSubject: [],
})

export const errors = reactive({
  niveau: null,
  classe: null,
  spe: {
    a: null,
    b: null,
    c: null,
  },
  lv: {
    a: null,
    b: null,
  },
  option: null,
  section: {
    lang: null,
    dnl: null,
  },
  goodSubject: null,
  badSubject: null,
})

export const options = reactive(getDefaultOptions())
export const optionOptions = ref()
