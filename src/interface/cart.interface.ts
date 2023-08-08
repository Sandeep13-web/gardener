import { ICartProduct } from "./product.interface";

export interface ICreateCartItem {
  note: string;
  variant_id: number | undefined;
  quantity: number;
  cart_id?: string;
}

export interface IUpdateCartItem {
  note: string;
  quantity: number;
  product_number?: number;
}

export interface ExtraCharge {
  title: string;
  value: number;
}

// export interface ICartItem {
//   campaign_message: string;
//   cartNumber: string;
//   carts: ICartProduct[];
//   categoryId: null | number;
//   deliveryCharge: number;
//   discount: number;
//   extra: ExtraCharge[];
//   couponDiscount: number;
//   id: number;
//   message: string;
//   orderAmount: number;
//   pickupTotal: number;
//   scheme: number;
//   subTotal: number;
//   total: number;
//   warehouseId: number;
// }

export interface ICartItem {
  warehouseId: number;
  deliveryAddress: string | null;
  message: string | null;
  id: number;
  orderAmount: number;
  discountAmount: number;
  scheme: number;
  vatAmount: number;
  offerDiscount: number;
  deliveryDiscount: number;
  deliveryCharge: number;
  serviceCharge: number;
  subTotal: number;
  total: number;
  numberOfCartProducts: number;
  numberOfCarts: number;
  couponDiscount: number;
}

export interface ICartTable {
  cartItem?: ICartProduct;
}

export interface ICartData {
  data: ICartProduct[];
}
