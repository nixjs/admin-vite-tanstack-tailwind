import { Category } from '@/model/category'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import devtoolConfig from './devtool'

export interface CategoryState {
  parentCategories: Category[]
  categories: Category[]
  total: number
}

interface CategoryAction {
  setCategories: (payload: Category[]) => void
  setParentCategories: (payload: Category[]) => void
  reset: () => void
}

const initialState: CategoryState = {
  total: 0,
  categories: [],
  parentCategories: [],
}

const useCategoryStore = create<CategoryState & CategoryAction>()(
  devtools(
    (set) => ({
      ...initialState,
      setCategories: (payload) =>
        set(() => {
          return { categories: payload, total: payload.length }
        }),
      setParentCategories: (payload) =>
        set(() => ({ parentCategories: payload })),
      reset: () => set(() => ({ ...initialState })),
    }),
    devtoolConfig('category', 'staking.app')
  )
)

export default useCategoryStore
