import { IResetPassword } from "@/interface/password.interface";
import { resetPassword } from "@/services/auth.service";
import ButtonLoader from "@/shared/components/btn-loading";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ResetPasswordForm = () => {
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm<IResetPassword>();

    const resetPasswordSubmit: SubmitHandler<IResetPassword> = (resetPassword) => {
        mutation.mutate(resetPassword);
    }

    const mutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: (data) => {
            showToast(TOAST_TYPES.success, 'Password reset successfully!');
            router.push('/login');
        },
        onError: (error: any) => {
            const errors = error?.response?.data?.errors;
            showToast(TOAST_TYPES.error, errors[0]?.message)
        }
    });

    const validRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    return (
        <form
            onSubmit={handleSubmit(resetPasswordSubmit)}
            autoComplete="off"
        >
            <div className="flex flex-col mb-[20px]">
                <input
                    type="text"
                    placeholder="Enter Reset Code"
                    className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors.code ? 'border-error' : 'border-gray-350'}`}
                    {...register("code", { required: 'Reset Code is required.' })}
                    onBlur={() => trigger("code")}
                />
                {
                    errors.code &&
                    <p className="text-error text-xs leading-[24px] mt-1">{errors?.code?.message}</p>
                }
            </div>
            <div className="flex flex-col mb-[20px]">
                <input
                    type="text"
                    placeholder="Enter Reset Password"
                    className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors?.password ? 'border-error' : 'border-gray-350'}`}
                    {...register("password", {
                        required: 'Password is required.',
                        pattern: {
                            value: validRegex,
                            message: 'Password must contain at least 8 characters, 1 uppercase letter,1 lowercase letter and a number',
                        }
                    })}
                    onBlur={() => trigger("password")}
                />
                {
                    errors.password &&
                    <p className="text-error text-xs leading-[24px] mt-1">{errors?.password?.message}</p>
                }
            </div>
            <div className="flex flex-col mb-[20px]">
                <input
                    type="text"
                    placeholder="Confirm Password"
                    className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors['new-password'] ? 'border-error' : 'border-gray-350'}`}
                    {...register("new-password", { required: 'Confirm Password is required.', validate: (value) => value === watch("password") || 'Password do not match.' })}
                    onBlur={() => trigger("new-password")}
                />
                {
                    errors['new-password'] &&
                    <p className="text-error text-xs leading-[24px] mt-1">{errors['new-password']?.message}</p>
                }
            </div>
            <div className="flex items-center justify-between">
                <button
                    className="btn btn-tertiary text-slate-850 text-sm font-bold uppercase px-[30px] py-[11px] rounded-[30px] hover:bg-primary hover:text-white hover:border-primary"
                >
                    Change Password
                    {
                        mutation.isLoading &&
                        <ButtonLoader />
                    }
                </button>
            </div>
        </form>
    );
}

export default ResetPasswordForm;