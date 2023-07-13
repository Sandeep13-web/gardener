import ForgotPasswordForm from '@/features/Auth/forgot-password'
import LoginForm from '@/features/Auth/login-form'
import RegisterForm from '@/features/Auth/register'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const AuthBody = () => {
    const router = useRouter()

    return (
        <section className='my-[55px]'>
            <div className="container">
                <div className='flex flex-col items-center gap-[40px] max-w-full md:max-w-[670px] m-auto'>
                    {
                        !router.pathname.includes('/forgot-password') &&
                        <div className='flex items-center gap-[20px]'>
                            <Link
                                href='/auth/login'
                                className={`text-2xl font-bold ${router.pathname.includes('/login') ? 'text-primary' : 'text-slate-850'} `}
                            >Login</Link>
                            <span className='text-sm'>|</span>
                            <Link
                                href='/auth/register'
                                className={`text-2xl font-bold ${router.pathname.includes('/register') ? 'text-primary' : 'text-slate-850'} `}
                            >Sign Up</Link>
                        </div>
                    }
                    <div className='auth-form'>
                        {
                            router.pathname.includes('/forgot-password') ?
                                <ForgotPasswordForm />
                                :
                                router.pathname.includes('/login') ?
                                    <LoginForm />
                                    :
                                    <RegisterForm />
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuthBody