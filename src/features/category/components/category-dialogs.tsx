import { useCategory } from '../context/category-context'
// import { CategoryActionDialog } from './category-action-dialog'
import { CategoryMutateDrawer } from './category-mutate-drawer'

export function CategoryDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCategory()
  return (
    <>
      <CategoryMutateDrawer
        key='category-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />
      {currentRow && (
        <>
          <CategoryMutateDrawer
            key={`category-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
