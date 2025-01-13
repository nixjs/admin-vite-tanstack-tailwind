import axios from 'axios'
import * as API from '@/consts/api'
import { DataWithPagination, PayloadWithPagination, Status } from '@/model/base'
import { Category, CategoryWithChildren } from '@/model/category'
import { withHeaders } from '@/lib/jwt'
import { AuthStorageServices } from '../localstorage'

export const addRequest = async (
  category: Omit<Category, 'id'> & { categoryId?: string }
): Promise<CategoryWithChildren> => {
  const response = await axios({
    baseURL: import.meta.env.VITE_API,
    url: `/${API.Category.Add.path}`,
    method: API.Category.Add.method,
    data: category,
    headers: withHeaders(AuthStorageServices.getAccessToken() ?? ''),
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
    headers: withHeaders(AuthStorageServices.getAccessToken() ?? ''),
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
} & PayloadWithPagination): Promise<
  DataWithPagination<CategoryWithChildren>
> => {
  const response = await axios({
    baseURL: import.meta.env.VITE_API,
    url: `/${API.Category.FindAll.path}?page=${page}&size=${size}&status=${status}`,
    method: API.Category.FindAll.method,
  })
  return response.data
}
