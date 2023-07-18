import React from 'react'
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { IChangePassword } from '@/interface/password.interface';
import { changePassword, logout } from '@/services/auth.service';
const ChangePasswordForm = () => {
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm<IChangePassword>();

    const changePasswordSubmit: SubmitHandler<IChangePassword> = (changePassword) => {
        mutation.mutate(changePassword)
    }

    const mutation = useMutation({
        mutationFn: changePassword,
        onSuccess: (data) => {
            logoutMutation.mutate();
        },
        onError: (error: any) => {
            const errors = error?.response?.data?.errors;
            showToast(TOAST_TYPES.error, errors[0]?.message);
        }
    });

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            deleteCookie("token");
            deleteCookie("isLoggedIn");
            router.push('/auth/login');
        },
        onError: (error: any) => {
            console.log(error);
        }
    });

    const validRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return (
        <form className="px-6 py-6" onSubmit={handleSubmit(changePasswordSubmit)} autoComplete="off">
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12">
                    <input
                        type="text"
                        placeholder="OLD PASSWORD"
                        // className="w-full h-10 input input-bordered "
                        className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors["old-password"] ? 'border-error' : 'input-bordered'}`}
                        {...register("old-password", { required: 'Old Password is required.' })}
                        onBlur={() => trigger("old-password")}
                    />
                    {
                        errors['old-password'] &&
                        <p className="text-error text-xs leading-[24px] mt-1">{errors['old-password']?.message}</p>
                    }
                </div>
                <div className="col-span-12">
                    <input
                        type="text"
                        placeholder="NEW PASSWORD"
                        className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors["new-password"] ? 'border-error' : 'input-bordered'}`}
                        {...register("new-password", {
                            required: 'New Password is required.',
                            validate: (value) => value !== watch("old-password") || 'Old password and New password must be different.',
                            pattern: {
                                value: validRegex,
                                message: 'Password must contain at least 8 characters, 1 uppercase letter,1 lowercase letter and a number',
                            }
                        })}
                        onBlur={() => trigger("new-password")}
                    />
                    {
                        errors['new-password'] &&
                        <p className="text-error text-xs leading-[24px] mt-1">{errors['new-password']?.message}</p>
                    }
                </div>
                <div className="col-span-12">
                    <input
                        type="text"
                        placeholder="CONFIRM PASSWORD"
                        className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors["confirm-password"] ? 'border-error' : 'input-bordered'}`}
                        {...register("confirm-password", { required: 'Confirm Password is required.', validate: (value) => value === watch("new-password") || 'Password do not match.' })}
                        onBlur={() => trigger("confirm-password")}
                    />
                    {
                        errors['confirm-password'] &&
                        <p className="text-error text-xs leading-[24px] mt-1">{errors['confirm-password']?.message}</p>
                    }
                </div>
                <div className="flex justify-between col-span-12">
                    {/* <button className="primary-btn py-4 w-[50%]">Save</button> */}
                    <button
                        className="btn btn-tertiary text-slate-850 text-sm font-bold uppercase px-[30px] py-[11px] rounded-[30px] hover:bg-primary hover:text-white hover:border-primary"
                    >
                        Save
                        {
                            mutation.isLoading &&
                            <span className="w-5 h-5 border-4 border-white border-dotted rounded-full border-t-transparent animate-spin"></span>
                        }
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ChangePasswordForm