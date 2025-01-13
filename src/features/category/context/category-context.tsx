import React, { useState } from 'react'
import { Category } from '@/model/category'
import useDialogState from '@/hooks/use-dialog-state'

type CategoryDialogType = 'create' | 'update'

interface TasksContextType {
  open: CategoryDialogType | null
  setOpen: (str: CategoryDialogType | null) => void
  currentRow: Category | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Category | null>>
}

const CategoryContext = React.createContext<TasksContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function TasksProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<CategoryDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Category | null>(null)
  return (
    <CategoryContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </CategoryContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCategory = () => {
  const categoryContext = React.useContext(CategoryContext)

  if (!categoryContext) {
    throw new Error('useCategory has to be used within <CategoryContext>')
  }

  return categoryContext
}
