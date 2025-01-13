import * as z from 'zod'
import { Status } from '@/model/base'
import { I18nSchema } from './base'

export const CategorySchema = z.object({
  name: I18nSchema,
  status: z.number().default(Status.INACTIVE),
  slug: z.string().default('empty'),
  description: I18nSchema,
  ratio: z.string().default('0'),
  parentId: z.string().default(''),
})
