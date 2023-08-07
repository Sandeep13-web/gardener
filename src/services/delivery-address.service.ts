import axiosInstance from "@/axios/axiosInstance";
import { IDeliveryAddress } from "@/interface/delivery-address.interface";

export const getDeliverAddress = async () => {
  try {
    const response = await axiosInstance.get(`/deliveryAddress`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getDeliverAddressById = async (addressId: number) => {
  try {
    const response = await axiosInstance.get(`/deliveryAddress/${addressId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addDeliverAddress = async (deliveryAddress: IDeliveryAddress) => {
  try {
    const response = await axiosInstance.post("/deliveryAddress", {
      name: deliveryAddress.name,
      mobile_number: deliveryAddress.mobile_number,
      address: deliveryAddress.address,
      title: deliveryAddress.title,
      lat: deliveryAddress.lat,
      lng: deliveryAddress.lng,
      default: deliveryAddress.default,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDeliverAddressById = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/deliveryAddress/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateDeliveryAddressByAddressId = async (
  deliveryAddress: IDeliveryAddress
) => {
  const payload = {
    name: deliveryAddress.name,
    mobile_number: deliveryAddress.mobile_number,
    address: deliveryAddress.address,
    title: deliveryAddress.title,
    lat: deliveryAddress.lat,
    lng: deliveryAddress.lng,
    default: deliveryAddress.default,
  };

  try {
    const response = await axiosInstance.patch(
      `/deliveryAddress/${deliveryAddress?.id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
