import * as z from 'zod'

export const I18nSchema = z.object({
  vi: z.string(),
  en: z.string(),
  'zh-cn': z.string(),
})

export const IdSchema = z.object({
  id: z.string(),
})
