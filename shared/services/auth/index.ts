import { ILogin } from '@features/auth/login/interface';
import axiosInstance from '@shared/axios';
import { addAuthToStorage } from '@shared/utils/cookies-utils/cookies.util';
import { showToast, TOAST_TYPES } from '@shared/utils/toast-utils/toast.util';
import { notification } from 'antd';

export const loginUser: any = async ({
    userName,
    password,
    rememberMe,
}: ILogin) => {
    notification.destroy();
    try {
        const response = await axiosInstance.post('Account/Login', {
            userName: userName.trim(),
            password,
            rememberMe,
        });
        if (response.status === 200) {
            await addAuthToStorage(response?.data, rememberMe);
            return [response, null];
        } else {
            showToast(TOAST_TYPES.error, 'Lost Internet Connection.');
            return [null, null];
        }
    } catch (err: any) {
        if (err.status === 401)
            showToast(TOAST_TYPES.error, 'Invalid Username and Password.');
        if (err.status === 500)
            showToast(TOAST_TYPES.error, 'Server Error: Please contact system Admin.');
        return [null, err];
    }
};
