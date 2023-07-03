import React from 'react'

const ForgotPasswordForm = () => {
    return (
        <form>
            <p className='mb-[20px] text-sm text-zinc-250 leading-[24px]'>
            Please enter email address/phone number. You will receive a link to create new password via email or OTP in your phone number.
            </p>
            <div className='flex flex-col mb-[20px]'>
                <input
                    type="text"
                    placeholder='Enter Your Email or Phone number'
                    className='px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border border-gray-350'
                />
                <p className='text-error text-xs leading-[24px] mt-1'>error</p>
            </div>
            <div className='flex justify-between items-center'>
                <button
                    className='btn btn-tertiary text-slate-850 text-sm font-bold uppercase px-[30px] py-[11px] rounded-[30px] hover:bg-primary hover:text-white hover:border-primary'
                >Reset Password</button>
            </div>
        </form>
    )
}

export default ForgotPasswordForm