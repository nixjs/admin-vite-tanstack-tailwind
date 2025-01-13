import * as z from 'zod'
import { CategorySchema } from '@/schema/category'
import { I18n, Status } from './base'

export interface Category {
  id: string
  name: I18n
  status: Status
  slug: string
  description: I18n
  ratio: string
  parentId?: string
}

export interface CategoryWithChildren extends Category {
  subcategories: Category[]
}

export type CategoryRequest = Pick<
  z.TypeOf<typeof CategorySchema>,
  'ratio' | 'slug' | 'status' | 'parentId'
> & {
  name: I18n
  description: I18n
  isEdit: boolean
}
