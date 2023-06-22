import { login } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FieldApi, createFormFactory } from '@tanstack/react-form'

type IloginProps = {
    username: string,
    password: string
}

const formFactory = createFormFactory<IloginProps>({
    defaultValues: {
        username: '',
        password: '',
    },

});

function FieldInfo({ field }: { field: FieldApi<any, any> }) {
    return (
        <>
            {field.state.meta.touchedError ? (
                <p className='text-error text-xs leading-[24px] mt-1'>{field.state.meta.touchedError}</p>
            ) : null}
        </>
    );
}

const LoginForm = () => {
    const router = useRouter()
    const mutation = useMutation(login)

    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [credentialsError, setCredentialError] = useState('')


    const form = formFactory.useForm({
        onSubmit: (values) => {
            let payload = values
            mutation.mutate(payload)
            form.reset()
        },
    })

    // useEffect(() => {
    //     if (mutation.isSuccess) {
    //         router.push('/')
    //     }
    //     if (mutation.isError) {
    //         const errors = mutation.error.response.data.errors
    //         errors.map((error: any) => {
    //             if (error.title === 'username') setUsernameError(error.message)
    //             if (error.title === 'password') setPasswordError(error.message)
    //             if (error.title === 'invalid_credentials') setCredentialError(error.message)
    //         })
    //     }
    // }, [mutation])

    return (
        <form.Provider>
            <form {...form.getFormProps()}>
                <div className='flex flex-col mb-[20px]'>
                    <form.Field
                        name="username"
                        onChange={(value) =>
                            !value
                                ? "Username is required" : undefined
                        }
                        children={(field) => {
                            return (
                                <>
                                    <input
                                        placeholder='Phone Number/Email'
                                        className='px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border border-gray-350'
                                        {...field.getInputProps()}
                                        value={field.state.value || ''}
                                    />
                                    <FieldInfo field={field} />
                                </>
                            );
                        }}
                    />
                </div>
                <div className='flex flex-col mb-[20px]'>
                    <form.Field
                        name="password"
                        onChange={(value) =>
                            !value
                                ? "Password is required" : undefined
                        }
                        children={(field) => {
                            return (
                                <>
                                    <input
                                        placeholder='Password'
                                        className='px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border border-gray-350'
                                        {...field.getInputProps()}
                                        value={field.state.value || ''}
                                    />
                                    <FieldInfo field={field} />
                                </>
                            );
                        }}
                    />
                </div>
                <div className='flex justify-between items-center'>
                    <form.Subscribe
                        {...{
                            selector: (state) =>
                                [state.canSubmit, state.isSubmitting] as const,
                            children: ([canSubmit]) => (
                                <button
                                    type="submit"
                                    disabled={!canSubmit}
                                    className='btn btn-tertiary text-slate-850 text-sm font-bold uppercase px-[30px] py-[11px] rounded-[30px] hover:bg-primary hover:text-white hover:border-primary'
                                >
                                    Login
                                </button>
                            ),
                        }}
                    />
                    <Link href='/auth/forgot-password' className='text-slate-850 text-sm hover:text-primary transition-all delay-100 duration-150'>Forgot Password?</Link>
                </div>
            </form>
        </form.Provider >
    )
}

export default LoginForm