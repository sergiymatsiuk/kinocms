import store from '../store'
import ukr from '../locales/ukr.json'
import rus from '../locales/rus.json'

const locales = {
  'ukr-UKR': ukr,
  'rus-RUS': rus
}

export default function localizeFilter (key) {
  const locale = store.getters.info.locale || 'ukr-UKR'
  return locales[locale][key] || `[Localize error]: key ${key} not found`
}
