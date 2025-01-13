import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { DataWithPagination, Status } from '@/model/base'
import { CategoryWithChildren } from '@/model/category'
import useCategoryStore from '@/stores/useCategoryStore'
import * as CategoryApi from '@/utils/axios/category'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CategoryDialogs } from './components/category-dialogs'
import { CategoryPrimaryButtons } from './components/category-primary-buttons'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import CategoryProvider from './context/category-context'
import { flattenCategories } from './utils'

export default function Category() {
  const categoryState = useCategoryStore()
  const { data } = useQuery<DataWithPagination<CategoryWithChildren>, Error>({
    queryKey: ['category'],
    queryFn: () =>
      CategoryApi.findAllRequest({
        size: 100,
        page: 0,
        status: Status.ACTIVE,
      }),
    // enabled: param !== null && param !== '',
  })

  React.useEffect(() => {
    categoryState.setParentCategories(
      data?.data?.map(({ subcategories, ...rest }) => rest) ?? []
    )
    categoryState.setCategories(flattenCategories(data?.data ?? []))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data])

  return (
    <CategoryProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Category</h2>
          </div>
          <CategoryPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={categoryState.categories} columns={columns} />
        </div>
      </Main>

      <CategoryDialogs />
    </CategoryProvider>
  )
}
