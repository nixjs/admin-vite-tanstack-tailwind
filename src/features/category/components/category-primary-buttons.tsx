import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useCategory } from '../context/category-context'

export function CategoryPrimaryButtons() {
  const { setOpen } = useCategory()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('create')}>
        <span>Create</span> <IconPlus size={18} />
      </Button>
    </div>
  )
}
