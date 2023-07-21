import { deleteCookie, getCookie, setCookie } from "cookies-next";

import { CookieKeys } from "@/shared/enum";
import { ILogin, IWareHouseProps } from "@/interface/login.interface";
import { setAuthorizationHeader } from "@/axios/axiosInstance";

export const addAuthToStorage = (user: ILogin) => {
  setCookie(CookieKeys.TOKEN, user);
};

export const getToken = () => {
  return getCookie(CookieKeys.TOKEN);
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
