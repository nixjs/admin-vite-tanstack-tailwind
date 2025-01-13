import { ColumnDef } from '@tanstack/react-table'
import { Status } from '@/model/base'
import { Category } from '@/model/category'
import { cn, ellipsisMiddle } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { callTypes } from '../const'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Id' />
    ),
    cell: ({ row }) => (
      <div className='w-[80px]'>{ellipsisMiddle(row.getValue('id'))}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ row }) => {
      const {
        original: { name },
      } = row

      return (
        <div className='flex flex-col gap-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            - {name['en']}
          </span>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            - {name['vi']}
          </span>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            - {name['zh-cn']}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => {
      const {
        original: { description },
      } = row

      return (
        <div className='flex flex-col gap-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            - {description['en']}
          </span>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            - {description['vi']}
          </span>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            - {description['zh-cn']}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'ratio',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ratio' />
    ),
    cell: ({ row }) => {
      const ratio = row.getValue('ratio')
      return <div className='w-[80px]'>{ratio ? `${ratio}%` : '0%'}</div>
    },
  },
  {
    accessorKey: 'parentId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Parent' />
    ),
    cell: ({ row }) => {
      const {
        original: { parentId },
      } = row
      return (
        <div className='flex space-x-2'>
          {parentId && (
            <Badge variant='outline'>{ellipsisMiddle(parentId)}</Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const badgeColor = callTypes.get(row.getValue('status'))
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {row.getValue('status') === Status.ACTIVE ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
