import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { CookieKeys } from '@/shared/enum';
import { ILoginProps } from '@/features/Auth/login/login.interface';

export const getUserFromStorage = (): any => {
    let user = getCookie(CookieKeys.USER);
    return user;
};

export const addAuthToStorage = (user: ILoginProps) => {
    setCookie(CookieKeys.USER, user);
};

export const getToken = () => {
    if (getUserFromStorage()) {
        const token = JSON.parse(getUserFromStorage())?.token;
        return token;
    }
};

export const clearAuthFromStorage = () => {
    deleteCookie(CookieKeys.USER);
};
