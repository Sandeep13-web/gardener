import { login } from '@/services/auth.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ILogin } from '../../../interface/login.interface'
import { setCookie } from 'cookies-next'
import { TOAST_TYPES, showToast } from '@/shared/utils/toast-utils/toast.utils'
import ButtonLoader from '@/shared/components/btn-loading'


const LoginForm = () => {
    const router = useRouter()
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setCookie('token', data?.access_token);
            setCookie('isLoggedIn', true)
            showToast(TOAST_TYPES.success, 'You have been successfully logged in.');
            router.push('/');
        },
        onError: (error: any) => {
            const errors = error?.response?.data?.errors
            showToast(TOAST_TYPES.error, errors[0]?.message)
        },
    })
    const { register, handleSubmit, formState: { errors }, trigger } = useForm<ILogin>()

    const loginSubmit: SubmitHandler<ILogin> = (data) => {
        mutation.mutate(data)
    }

    return (
        <form onSubmit={handleSubmit(loginSubmit)} autoComplete='off'>
            <div className='flex flex-col mb-[20px]'>
                <input
                    type="text"
                    placeholder='Phone Number/Email'
                    {...register("username", { required: 'Username is required.' })}
                    onBlur={() => trigger('username')}
                    className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors.username ? 'border-error' : 'border-gray-350'}`}
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
                    className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors.password ? 'border-error' : 'border-gray-350'}`}
                />
                {
                    errors.password &&
                    <p className='text-error text-xs leading-[24px] mt-1'>{errors.password.message}</p>
                }
            </div>
            <div className='flex items-center justify-between'>
                <button
                    disabled={mutation.isLoading}
                    type='submit'
                    className='submit-btn'
                >
                    Login
                    {
                        mutation.isLoading &&
                        <ButtonLoader />
                    }
                </button>
                <Link href='/auth/forgot-password' className='text-sm transition-all duration-150 delay-100 text-slate-850 hover:text-primary'>Forgot Password?</Link>
            </div>
        </form>
    )
}

export default LoginForm