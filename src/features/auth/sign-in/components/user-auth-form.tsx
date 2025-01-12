import React, { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { router } from '@/app'
import { LoginFormRequest } from '@/model/auth'
import { Route } from '@/routes/(auth)/sign-in'
import { LoginSchema } from '@/schema/auth'
import useAuthStore from '@/stores/useAuthStore'
import { decodeAccessToken } from '@/lib/jwt'
// import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { loginRequest } from '@/utils/axios/auth'
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
import { PasswordInput } from '@/components/password-input'

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const authState = useAuthStore()
  const searchParam = Route.useSearch()

  const { mutate, isError, isSuccess, data } = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string
      password: string
    }) => {
      return loginRequest(username, password)
    },
  })

  const form = useForm<LoginFormRequest>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  React.useEffect(() => {
    if (isSuccess && data) {
      const { accessToken, refreshToken } = data
      const decoded = decodeAccessToken<{
        id: string
        walletAddress: string
        role: string
      }>(accessToken)
      if (decoded)
        authState.setUser({
          id: decoded.id,
        })
      authState.setAccessToken(accessToken)
      authState.setRefreshToken(refreshToken)
      router.navigate({ to: searchParam.redirect ?? '/' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess])

  function onSubmit(data: LoginFormRequest) {
    setIsLoading(true)
    mutate(data)
    if (isError || isSuccess) setIsLoading(false)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    {/* <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      Forgot password?
                    </Link> */}
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={isLoading}>
              Login
            </Button>

            {/* <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                disabled={isLoading}
              >
                <IconBrandGithub className='h-4 w-4' /> GitHub
              </Button>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                disabled={isLoading}
              >
                <IconBrandFacebook className='h-4 w-4' /> Facebook
              </Button>
            </div> */}
          </div>
        </form>
      </Form>
    </div>
  )
}
