import { signUp } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { IRegister } from '../../../interface/register.interface'
import { TOAST_TYPES, showToast } from '@/shared/utils/toast-utils/toast.utils'
import ButtonLoader from '@/shared/components/btn-loading'

const RegisterForm = () => {
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            showToast(TOAST_TYPES.success, 'User Created Successfully.');
            router.push('/login');
        },
        onError: (error: any) => {
            const errors = error?.response?.data?.errors
            errors.map((err: any) => {
                showToast(TOAST_TYPES.error, err.message);
            })
        }
    })

    const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm<IRegister>()

    const registerSubmit = (data: any) => {
        mutation.mutate(data)
    }


    return (
        <form onSubmit={handleSubmit(registerSubmit)} autoComplete='off'>
            <div className='flex flex-col mb-[20px]'>
                <input
                    type="text"
                    placeholder='Enter Your First Name'
                    {...register("first_name", { required: 'FirstName is required.' })}
                    onBlur={() => trigger('first_name')}
                    className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors.first_name ? 'border-error' : 'border-gray-350'}`}
                />
                {
                    errors.first_name &&
                    <p className='text-error text-xs leading-[24px] mt-1'>{errors.first_name.message}</p>
                }
            </div>
            <div className='flex flex-col mb-[20px]'>
                <input
                    type="text"
                    {...register("last_name", { required: 'LastName is required.' })}
                    placeholder='Enter Your Last Name'
                    onBlur={() => trigger('last_name')}
                    className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors.last_name ? 'border-error' : 'border-gray-350'}`}
                />
                {
                    errors.last_name &&
                    <p className='text-error text-xs leading-[24px] mt-1'>{errors.last_name.message}</p>
                }
            </div>
            <div className='flex flex-col mb-[20px]'>
                <input
                    type="text"
                    {...register("mobile_number",
                        {
                            required: "Phone number is required.",
                            pattern: {
                                value: /^[9]\d{9}$/,
                                message: "Phone number must start with 9 and have 10 digits.",
                            }
                        })}
                    onBlur={() => trigger('mobile_number')}
                    placeholder='Enter Your Phone Number'
                    className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors.mobile_number ? 'border-error' : 'border-gray-350'}`}
                />
                {
                    errors.mobile_number &&
                    <p className='text-error text-xs leading-[24px] mt-1'>{errors.mobile_number.message}</p>
                }
            </div>
            <div className='flex flex-col mb-[20px]'>
                <input
                    type="text"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address.",
                        },
                    })}
                    placeholder='Enter Your Email'
                    className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors.email ? 'border-error' : 'border-gray-350'}`}
                />
                {
                    errors.email &&
                    <p className='text-error text-xs leading-[24px] mt-1'>{errors.email.message}</p>
                }
            </div>
            <div className='flex flex-col mb-[20px]'>
                <input type="password"
                    placeholder='Password'
                    {...register("password", {
                        required: 'Password is required.',
                        minLength: {
                            value: 6,
                            message: "Password must have at least 6 characters.",
                        },
                    })}
                    onBlur={() => trigger('password')}
                    className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors.password ? 'border-error' : 'border-gray-350'}`}
                />
                {
                    errors.password &&
                    <p className='text-error text-xs leading-[24px] mt-1'>{errors.password.message}</p>
                }
            </div>
            <div className='flex flex-col mb-[20px]'>
                <input type="password"
                    placeholder='Confirm Password'
                    {...register("confirm_password"
                        ,
                        {
                            required: "Confirm Password is required.",
                            validate: (value) => value === watch("password") || "Password do not match"
                        },
                    )}
                    className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors.confirm_password ? 'border-error' : 'border-gray-350'}`}
                />
                {
                    errors.confirm_password &&
                    <p className='text-error text-xs leading-[24px] mt-1'>{errors.confirm_password.message}</p>
                }
            </div>
            <div className='flex items-center justify-between'>
                <button
                    type='submit'
                    className='submit-btn'
                    disabled={mutation.isLoading ? true : false}
                >
                    Sign Up
                    {
                        mutation.isLoading &&
                        <ButtonLoader />
                    }
                </button>
            </div>
        </form>
    )
}

export default RegisterForm