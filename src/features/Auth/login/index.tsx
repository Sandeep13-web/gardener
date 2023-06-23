import { login } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ILoginProps } from './login.interface'
import { setCookie } from 'cookies-next'
import { TOAST_TYPES, showToast } from '@/shared/utils/toast-utils/toast.utils'


const LoginForm = () => {
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setCookie('user', data?.access_token);
            showToast(TOAST_TYPES.success, 'Successfully logged in.');
            router.push('/');
        },
        onError: (error: any) => {
            const errors = error?.response?.data?.errors
            showToast(TOAST_TYPES.error , errors[0]?.message)
        }
    })
    const { register, handleSubmit, formState: { errors }, trigger } = useForm<ILoginProps>()

    const loginSubmit: SubmitHandler<ILoginProps> = (data) => {
        mutation.mutate(data)
    }

    return (
        <form onSubmit={handleSubmit(loginSubmit)}>
            <div className='flex flex-col mb-[20px]'>
                <input
                    type="text"
                    placeholder='Phone Number/Email'
                    {...register("username", { required: 'Username is required.' })}
                    onBlur={() => trigger('username')}
                    className='px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border border-gray-350'
                />
                {
                    errors.username &&
                    <p className='text-error text-xs leading-[24px] mt-1'>{errors.username.message}</p>
                }
            </div>
            <div className='flex flex-col mb-[20px]'>
                <input type="password"
                    placeholder='Password'
                    {...register("password", { required: 'Password is required.', })}
                    onBlur={() => trigger('password')}
                    className='px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border border-gray-350'
                />
                {
                    errors.password &&
                    <p className='text-error text-xs leading-[24px] mt-1'>{errors.password.message}</p>
                }
            </div>
            <div className='flex justify-between items-center'>
                <button
                    disabled={mutation.isLoading ? true : false}
                    type='submit'
                    className='btn btn-tertiary text-slate-850 text-sm font-bold uppercase px-[30px] py-[11px] rounded-[30px] hover:bg-primary hover:text-white hover:border-primary'>Login</button>
                <Link href='/auth/forgot-password' className='text-slate-850 text-sm hover:text-primary transition-all delay-100 duration-150'>Forgot Password?</Link>
            </div>
        </form>
    )
}

export default LoginForm