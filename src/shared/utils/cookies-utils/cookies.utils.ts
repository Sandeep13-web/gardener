import { deleteCookie, getCookie, setCookie } from "cookies-next";

import { CookieKeys } from "@/shared/enum";
import { ILoginProps } from "@/features/Auth/login/login.interface";

export const getUserFromStorage = (): any => {
  let token = getCookie(CookieKeys.TOKEN);
  return token || '';
};

export const addAuthToStorage = (user: ILoginProps) => {
  setCookie(CookieKeys.TOKEN, user);
};

export const getToken = () => {
  if (getUserFromStorage()) {
    const token = getUserFromStorage();
    return token;
  }
};

export const clearAuthFromStorage = () => {
  deleteCookie(CookieKeys.USER);
};
