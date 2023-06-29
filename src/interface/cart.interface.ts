import { ICartProduct, IProduct } from "./product.interface";

export interface ICreateCartItem {
  productId: number | undefined;
  priceId: number | undefined;
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

export interface ICartItem {
  campaign_message: string;
  cartNumber: string;
  cartProducts: ICartProduct[];
  categoryId: null | number;
  deliveryCharge: number;
  discount: number;
  extra: ExtraCharge[];
  id: number;
  message: string;
  orderAmount: number;
  pickupTotal: number;
  scheme: number;
  subTotal: number;
  total: number;
  warehouseId: number;
}
