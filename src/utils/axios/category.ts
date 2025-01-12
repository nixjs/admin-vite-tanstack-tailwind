import axios from 'axios'
import * as API from '@/consts/api'
import { PayloadWithPagination, Status } from '@/model/base'
import { Category, CategoryWithChildren } from '@/model/category'

export const addRequest = async (
  category: Category & { categoryId?: string }
): Promise<CategoryWithChildren> => {
  const response = await axios({
    baseURL: import.meta.env.VITE_API,
    url: `/${API.Category.Add.path}`,
    method: API.Category.Add.method,
    data: category,
  })
  return response.data
}

export const updateRequest = async (
  category: Category & { categoryId?: string }
): Promise<CategoryWithChildren> => {
  const response = await axios({
    baseURL: import.meta.env.VITE_API,
    url: `/${API.Category.Update.path}`,
    method: API.Category.Update.method,
    data: category,
  })
  return response.data
}

export const findRequest = async (
  categoryId: string
): Promise<CategoryWithChildren> => {
  const response = await axios({
    baseURL: import.meta.env.VITE_API,
    url: `/${API.Category.Find.path}/${categoryId}`,
    method: API.Category.Find.method,
  })
  return response.data
}

export const findAllRequest = async ({
  page,
  size,
  status,
}: {
  status: Status
} & PayloadWithPagination): Promise<CategoryWithChildren> => {
  const response = await axios({
    baseURL: import.meta.env.VITE_API,
    url: `/${API.Category.Find.path}/page=${page}&size=${size}&status=${status}`,
    method: API.Category.Find.method,
  })
  return response.data
}
