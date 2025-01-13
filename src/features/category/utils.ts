import { Category, CategoryWithChildren } from '@/model/category'

export const flattenCategories = (
  categories: CategoryWithChildren[]
): Category[] => {
  return categories.reduce((acc: Category[], item: CategoryWithChildren) => {
    const { subcategories, ...rest } = item
    acc.push(rest)
    if (subcategories && subcategories.length > 0) {
      item.subcategories.forEach((sub: Category) => {
        acc.push({
          ...sub,
          parentId: item.id,
        })
      })
    }

    return acc
  }, [])
}
