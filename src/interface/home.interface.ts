import { IProduct } from "./product.interface";

export interface IHome {
  data: IHomeData;
}
export interface IHomeData {
  adBanners: IAdBanner[];
  appCategories: IAppCategories[];
  banners: IBanner[];
  brands: IBrands[];
  id: number;
  page: {
    " min-price": number;
  };
}
// Default value for appCategories as an empty array

export interface IAdBanner {
  bannerImage: string;
  id: number;
  linkTo: string;
  position: number;
  shortDescription: string;
  title: string;
  type: string;
  websiteUrl: string;
}

export interface IBanner {
  bannerImage: string;
  webpBannerImage: string;
  id: number;
  linkTo: string;
  position: number;
  shortDescription: string;
  title: string;
  type: string;
  websiteUrl: string;
  products: IBannerProduct[];
}

export interface UnitPrice {
  alwaysAvailable: boolean;
  barcode: string | null;
  hasOffer: boolean;
  id: number;
  markedPrice: number;
  newPrice: number;
  oldPrice: number;
  sellingPrice: number;
  size: string;
  sku: string;
  stock: number;
  title: string;
}

interface IBannerProduct {
  categorySlug: string;
  categoryTitle: string;
  hasOffer: boolean;
  id: number;
  slug: string;
  title: string;
  unitPrice: UnitPrice[];
}

interface IBrands {
  content: string;
  icon: string | null;
  id: number;
  slug: string;
  title: string;
}

export interface IAppCategories {
  collection_type: string;
  description: string | null;
  icon: string | null;
  id: number;
  position: number;
  product: IProduct[]; // Replace 'any' with the appropriate type for the 'products' property
  title: string;
  type: string;
}

export interface IWareHouse {
  id: number;
  title: string;
}

export interface IPaymentMethod {
  id: number;
  title: string;
  icon: string;
  default: boolean;
}

export interface PaymentFormProps {
  paymentMethods: IPaymentMethod[];
}
