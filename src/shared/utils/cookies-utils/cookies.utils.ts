import { deleteCookie, getCookie, setCookie } from "cookies-next";

import { CookieKeys } from "@/shared/enum";
import {
  ILoginProps,
  IWareHouseProps,
} from "@/features/Auth/login/login.interface";

export const getUserFromStorage = (): any => {
  let token = getCookie(CookieKeys.TOKEN);
  return token || "";
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

export const addWareHouseToStorage = (data: IWareHouseProps) => {
  const id = data?.id;
  setCookie(CookieKeys.WAREHOUSE, id);
};

export const getWareId = (): any => {
  let id = getCookie(CookieKeys.WAREHOUSE);
  return id || "";
};

export const getCartNumber = (): any => {
  let number = getCookie(CookieKeys.CARTNUMBER);
  return number || "";
};
