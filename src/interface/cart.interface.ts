export interface ICreateCartItem {
  productId: number | undefined;
  priceId: number | undefined;
  quantity: number;
  cart_id?: string;
}
