import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { ILogin } from '@features/auth/login/interface';
import { CookieKeys } from '@shared/enum';

export const getUserFromStorage = (): any => {
    let user = getCookie(CookieKeys.USER);
    return user;
};

export const addAuthToStorage = (user: ILogin, rememberMe: boolean) => {
    if (rememberMe) {
        setCookie(CookieKeys.USER, user, { maxAge: 86400 });
    } else {
        setCookie(CookieKeys.USER, user);
    }
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
