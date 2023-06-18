import { IWareHouse, UnitPrice } from "./home.interface";

export interface IProduct {
  brand: string | null;
  categoryBackgroundImage: string;
  categoryIcon: string;
  categoryId: number;
  categorySlug: string;
  categoryTitle: string;
  decimal: boolean;
  description: string;
  hasOffer: boolean;
  id: number;
  images: IProductImage[];
  link: string;
  moreInfo: string;
  slug: string;
  tags: IProductTag[];
  taxable: boolean;
  taxableAmount: number;
  title: string;
  unitPrice: UnitPrice[];
  warehouses: IWareHouse[];
}

interface IProductImage {
  id: number;
  imageName: string;
  unit_price_id: number | null;
}

interface IProductTag {
  content: string;
  featured: boolean;
  id: number;
  imageLink: string | null;
  slug: string;
  title: string;
}

interface IProductTag {
  content: string;
  featured: boolean;
  id: number;
  imageLink: string | null;
  slug: string;
  title: string;
}
