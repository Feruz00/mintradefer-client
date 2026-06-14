import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import ru from '@/locales/ru.json'
import tm from '@/locales/tm.json'
const savedLocale = localStorage.getItem('locale') || 'tm'

export default createI18n({
  locale: savedLocale,
  legacy: false,
  fallbackLocale: 'tm',
  messages: {
    en,
    ru,
    tm,
  },
})
