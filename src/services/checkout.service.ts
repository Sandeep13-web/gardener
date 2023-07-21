import { CookieKeys } from '@/shared/enum';
import { getToken, getWareId } from '@/shared/utils/cookies-utils/cookies.utils';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { config } from '../../config';

const baseURL = config.gateway.baseURL;

export const checkout = async (deliveryId: any, paymentMethodId: any, note:any) => {
  const checkoutUrl = `${baseURL}/cart/checkout`;

  const headers = {
    ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
    ...(getCartNumber() && { "Cart-Number": getCartNumber() }),
    // ...(getCoupon() && { Coupon: getCoupon() }),
    "Api-Key": config.gateway.apiKey,
    "Warehouse-Id": getWareId(),
    "DeliveryId": deliveryId.toString(),
    "PaymentMethodId": paymentMethodId.toString()
  };

  try {
    const response = await axios.delete(`${checkoutUrl}?note=${note}`, { headers });
    // Handle successful response
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

export const getCartNumber = (): any => {
  let number = getCookie(CookieKeys.CARTNUMBER);
  return number || "";
};



