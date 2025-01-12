import { I18n, Status } from './base'

export interface Category {
  name: I18n
  status: Status
  slug: string
  description: I18n
  ratio: number
}

export interface CategoryWithChildren extends Category {
  subcategories: Category[]
}