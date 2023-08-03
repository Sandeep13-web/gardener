import { signUp } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IRegister } from '../../../interface/register.interface'
import { TOAST_TYPES, showToast } from '@/shared/utils/toast-utils/toast.utils'
import ButtonLoader from '@/shared/components/btn-loading'
import { handleKeyDownAlphabet, handleKeyDownNumber } from '@/shared/utils/form-validation-utils'

const RegisterForm = () => {
    const router = useRouter()
    const [passwordMatch, setPasswordMatch] = useState<boolean>(true); // Track password match status

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

    const { register, getValues, handleSubmit, watch, setError, formState: { errors, isDirty }, trigger } = useForm<IRegister>()

    const registerSubmit = (data: any) => {
        mutation.mutate(data)
    }

    useEffect(() => {
        if (getValues("confirm_password") !== '') {
            // Update password match status whenever password or confirm_password values change
            if (isDirty) {
                setPasswordMatch(watch("password") === watch("confirm_password"));
            }

        }
    }, [watch("password"), watch("confirm_password"), isDirty]);
    return (
        <form onSubmit={handleSubmit(registerSubmit)} autoComplete='off'>
            <div className='flex flex-col mb-[20px]'>
                <input
                    type="text"
                    placeholder='Enter Your First Name'
                    {...register("first_name", {
                        required: 'First name is required',
                        pattern: {
                            value: /^[A-Za-z]+$/,
                            message: "Only alphabetical characters are allowed",
                        },
                    })}
                    maxLength={20}
                    onKeyUp={() => trigger("first_name")}
                    onKeyDown={handleKeyDownAlphabet}
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
                    {...register("last_name", {
                        required: 'Last name is required',
                        pattern: {
                            value: /^[A-Za-z]+$/,
                            message: "Only alphabetical characters are allowed",
                        },
                    })}
                    placeholder='Enter Your Last Name'
                    onKeyUp={() => trigger('last_name')}
                    maxLength={20}
                    onKeyDown={() => { handleKeyDownAlphabet }}
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
                            required: "Phone number is required",
                            pattern: {
                                value: /^98\d*$/,
                                message: "Incorrect phone number format",
                            },
                        })}
                    onKeyUp={() => trigger('mobile_number')}
                    pattern="^[1-9]\d*$"
                    maxLength={10}
                    inputMode='numeric'
                    placeholder='Enter Your Phone Number'
                    onKeyDown={handleKeyDownNumber}
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
                        required: "Email is required.",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                        },
                    })}
                    onKeyUp={() => trigger("email")}
                    placeholder='Enter Your Email'
                    className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors.email ? 'border-error' : 'border-gray-350'}`}
                />
                {
                    errors.email &&
                    <p className='text-error text-xs leading-[24px] mt-1'>{errors.email.message}</p>
                }
            </div>
            <div className='flex flex-col mb-[20px]'>
                <input type="text"
                    placeholder='Password'
                    {...register("password", {
                        required: 'Password is required',
                        minLength: {
                            value: 5,
                            message: "Password must have at least 6 characters.",
                        },
                    })}
                    onKeyUp={() => trigger('password')}
                    className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors.password ? 'border-error' : 'border-gray-350'}`}
                />
                {
                    errors.password &&
                    <p className='text-error text-xs leading-[24px] mt-1'>{errors.password.message}</p>
                }
            </div>
            <div className='flex flex-col mb-[20px]'>
                <input type="text"
                    placeholder='Confirm Password'
                    {...register("confirm_password",
                        {
                            required: "Confirm Password is required.",
                            validate: (value) => value === watch("password") || "Passwords do not match",
                        },
                    )}
                    onKeyUp={() => trigger('confirm_password')}
                    className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors.confirm_password && !passwordMatch ? 'border-error' : 'border-gray-350'}`}
                />
                {
                    errors.confirm_password && !passwordMatch &&
                    <p className='text-error text-xs leading-[24px] mt-1'>{errors.confirm_password.message}</p>
                }
                {
                    !errors.confirm_password && !passwordMatch && // Display error message when passwords don't match
                    <p className='text-error text-xs leading-[24px] mt-1'>Passwords do not match</p>
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