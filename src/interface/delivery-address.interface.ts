export interface IDeliveryAddressDetail {
  country: string;
  district: string;
  formattedAddress: string;
  intersection: string;
  localGovernment: string;
  provience: string;
  streetAddress: string;
  ward: string;
}

export interface IDeliveryAddress {
  address: string;
  contact_no: string;
  createdAt?: string;
  customer: string;
  detail?: IDeliveryAddressDetail | null;
  id?: number;
  title: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
  updatedAt?: string;
}