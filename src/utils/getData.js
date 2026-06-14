export const getTitle = (obj, locale) => {
  if (locale === 'tm') return obj.titleTm
  if (locale === 'en') return obj.titleEn
  return obj.titleRu
}
export const getContent = (obj, locale) => {
  if (locale === 'tm') return obj.contentTm
  if (locale === 'en') return obj.contentEn
  return obj.contentRu
}
export const getName = (obj, locale) => {
  if (locale === 'tm') return obj.nameTm
  if (locale === 'en') return obj.nameEn
  return obj.nameRu
}
export const getWorks = (obj, locale) => {
  if (locale === 'tm') return obj.worksTm
  if (locale === 'en') return obj.worksEn
  return obj.worksRu
}

export const getWorkArea = (obj, locale) => {
  if (locale === 'tm') return obj.workAreaTm
  if (locale === 'en') return obj.workAreaEn
  return obj.workAreaRu
}

export const getOutside = (obj, locale) => {
  if (locale === 'tm') return obj.outsideTm
  if (locale === 'en') return obj.outsideEn
  return obj.outsideRu
}
export const getLocaleValue = (obj, field, locale) => {
  const lang = locale?.value || locale

  const suffix = lang === 'tm' ? 'Tm' : lang === 'en' ? 'En' : 'Ru'

  return obj?.[`${field}${suffix}`] ?? ''
}
