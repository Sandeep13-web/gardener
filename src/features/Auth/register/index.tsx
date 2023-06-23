import { signUp } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const RegisterForm = () => {
    const router = useRouter()

    const mutation: any = useMutation({ mutationFn: signUp })
    const [fnameError, setFnameError] = useState('')
    const [lnameError, setLnameError] = useState('')
    const [phoneNumError, setPhoneNumError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')


    const register = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData.entries());
        // const payload = {first_name, last_name, mobile_number, email, password, confirmPassword}
        mutation.mutate(payload)
    }
    useEffect(() => {
        if (mutation.isSuccess) {
            router.push('/auth/login')
        }
        if (mutation.isError) {
            const errors = mutation.error.response.data.errors
            errors.map((error: any) => {
                if (error.title === 'first_name') setFnameError(error.message)
                if (error.title === 'last_name') setLnameError(error.message)
                if (error.title === 'email') setEmailError(error.message)
                if (error.title === 'mobile_number') setPhoneNumError(error.message)
                if (error.title === 'password') setPasswordError(error.message)
            })
        }
    }, [mutation])
    

    return (
        <form onSubmit={register}>
            <div className='flex flex-col mb-[20px]'>
                <input
                    type="text"
                    name='first_name'
                    placeholder='Enter Your First Name'
                    className='px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border border-gray-350'
                />
                {
                    fnameError &&
                    <p className='text-error text-xs leading-[24px] mt-1'>{fnameError}</p>
                }
            </div>
            <div className='flex flex-col mb-[20px]'>
                <input
                    type="text"
                    name="last_name"
                    placeholder='Enter Your Last Name'
                    className='px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border border-gray-350'
                />
                {
                    lnameError &&
                    <p className='text-error text-xs leading-[24px] mt-1'>{lnameError}</p>
                }
            </div>
            <div className='flex flex-col mb-[20px]'>
                <input
                    type="text"
                    name="mobile_number"
                    placeholder='Enter Your Phone Number'
                    className='px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border border-gray-350'
                />
                {
                    phoneNumError &&
                    <p className='text-error text-xs leading-[24px] mt-1'>{phoneNumError}</p>
                }
            </div>
            <div className='flex flex-col mb-[20px]'>
                <input
                    type="text"
                    name="email"
                    placeholder='Enter Your Email'
                    className='px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border border-gray-350'
                />
                {
                    emailError &&
                    <p className='text-error text-xs leading-[24px] mt-1'>{emailError}</p>
                }
            </div>
            <div className='flex flex-col mb-[20px]'>
                <input type="password"
                    placeholder='Password'
                    name="password"
                    className='px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border border-gray-350'
                />
                {
                    passwordError &&
                    <p className='text-error text-xs leading-[24px] mt-1'>{passwordError}</p>
                }
            </div>
            <div className='flex flex-col mb-[20px]'>
                <input type="password"
                    placeholder='Confirm Password'
                    name="confirmPassword"
                    className='px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border border-gray-350'
                />
                {/* <p className='text-error text-xs leading-[24px] mt-1'>Confirm Password Error</p> */}
            </div>
            <div className='flex justify-between items-center'>
                <button
                    type='submit'
                    className='btn btn-tertiary text-slate-850 text-sm font-bold uppercase px-[30px] py-[11px] rounded-[30px] hover:bg-primary hover:text-white hover:border-primary'
                    disabled={mutation.isLoading ? true : false}
                >Sign Up</button>
            </div>
        </form>
    )
}

export default RegisterForm