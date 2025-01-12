import { Method } from 'axios'

export interface ApiRequest {
  path: string
  method: Method
}

export type MethodPath = 'Add' | 'Update' | 'Find' | 'FindAll'

export type I18n = {
  vi: string
  en: string
  'zh-cn': string
}

export enum Status {
  ACTIVE = 1,
  INACTIVE,
}

export type DataWithPagination<T> = {
  data: T[]
  total: number
}

export type PayloadWithPagination = {
  page: number
  size: number
}
