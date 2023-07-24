import axiosInstance from "@/axios/axiosInstance";
import { IDeliveryAddress } from "@/interface/delivery-address.interface";

export const getDeliverAddress = async () => {
  try {
    const response = await axiosInstance.get(`/delivery-address`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getDeliverAddressById = async (addressId: number) => {
  try {
    const response = await axiosInstance.get(`/delivery-address/${addressId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addDeliverAddress = async (deliveryAddress: IDeliveryAddress) => {
  try {
    const response = await axiosInstance.post("/delivery-address", {
      customer: deliveryAddress.customer,
      contact_no: deliveryAddress.contact_no,
      address: deliveryAddress.address,
      title: deliveryAddress.title,
      latitude: deliveryAddress.latitude,
      longitude: deliveryAddress.longitude,
      isDefault: deliveryAddress.isDefault,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDeliverAddressById = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/delivery-address/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateDeliveryAddressByAddressId = async (
  deliveryAddress: IDeliveryAddress
) => {
  const payload = {
    customer: deliveryAddress.customer,
    contact_no: deliveryAddress.contact_no,
    address: deliveryAddress.address,
    title: deliveryAddress.title,
    latitude: deliveryAddress.latitude,
    longitude: deliveryAddress.longitude,
    isDefault: deliveryAddress.isDefault,
  };

  try {
    const response = await axiosInstance.patch(
      `/delivery-address/${deliveryAddress?.id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
