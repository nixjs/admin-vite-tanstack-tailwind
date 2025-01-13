import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Category, CategoryRequest } from '@/model/category'
import { CategorySchema } from '@/schema/category'
import useCategoryStore from '@/stores/useCategoryStore'
import * as CategoryApi from '@/utils/axios/category'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { SelectDropdown } from '@/components/select-dropdown'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Category
}
export function CategoryMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const isUpdate = !!currentRow
  const categoryState = useCategoryStore()

  const form = useForm<CategoryRequest>({
    resolver: zodResolver(CategorySchema),
    defaultValues: currentRow ?? {},
  })

  const mutation = useMutation({
    mutationFn: (data: Category) => {
      const { id, ...rest } = data
      return isUpdate
        ? CategoryApi.updateRequest(data)
        : CategoryApi.addRequest(rest)
    },
  })

  React.useEffect(() => {
    if (mutation.isSuccess) {
      onOpenChange(false)
      form.reset()
      toast({
        title: 'Success',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>
              {JSON.stringify(mutation.data, null, 2)}
            </code>
          </pre>
        ),
      })
    }
    if (mutation.isError)
      toast({
        title: 'Failed',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>
              {JSON.stringify(mutation.data, null, 2)}
            </code>
          </pre>
        ),
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutation.isSuccess])

  const onSubmit = (data: CategoryRequest) => {
    mutation.mutate({ ...data, id: currentRow?.id ?? '' })
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-left'>
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} Category</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update the task by providing necessary info.'
              : 'Add a new task by providing necessary info.'}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='tasks-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5 flex-1'
          >
            <FormField
              control={form.control}
              name='name.en'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Title (en)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a title (en)' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name.vi'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Title (vi)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a title (vi)' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name.zh-cn'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Title (zh-cn)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a title (zh-cn)' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description.en'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Description (en)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a description (en)' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description.vi'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Description (vi)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a description (vi)' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description.zh-cn'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Description (zh-cn)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Enter a description (zh-cn)'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='ratio'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Ratio</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      placeholder='Enter a ratio'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='parentId'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Parent category (Optional)</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Select parent category'
                    items={categoryState.parentCategories.map((c) => ({
                      ...c,
                      label: c.name?.en,
                      value: c.id,
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
          <Button form='tasks-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
