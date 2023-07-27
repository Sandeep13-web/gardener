import AccountSidebarLayout from "@/shared/account-sidebar-layout";
import MainLayout from "@/shared/main-layout";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { IDeliveryAddress } from "@/interface/delivery-address.interface";
import { addDeliverAddress, deleteDeliverAddressById, getDeliverAddress, updateDeliveryAddressByAddressId } from "@/services/delivery-address.service";
import dynamic from "next/dynamic";
import DeliveryAddressModal from "@/shared/components/delivery-address-modal";
import Address from "@/features/Address";

const LeafletMap = dynamic(() => import('@/shared/components/leaflet'), {
  ssr: false,
});

const DelieveryAddress = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [position, setPosition] = useState<[number, number]>([28.3949, 84.1240]); // Coordinates for Nepal
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<IDeliveryAddress>({
    address: '',
    contact_no: '',
    customer: '',
    isDefault: false,
    latitude: 27.7172,
    longitude: 85.3240,
    title: ''
  });

  interface MarkersProps {
    onMarkerClick: (lat: number, lng: number) => void;
    position: number[]; // Add the position prop to the interface
  }


  const phoneNumberRegex = /^(97|98)\d{8}$/;
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.latitude === 0 || formData.longitude === 0) {
      showToast(TOAST_TYPES.error, 'Please select a location');
      return;
    }
    if (!phoneNumberRegex.test(formData.contact_no)) {
      return;
    }
    if (isEditing) {
      // Call the update API for editing an existing address
      try {
        await updateDeliveryAddressByAddressId(formData);
        getDeliveryAddress();
        setShowModal(false); // Close the modal after successful update
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          const { errors } = error.response.data;
          errors.forEach((err:any) => {
            showToast(TOAST_TYPES.error, err.message);
          });
        } else {
          // Handle other types of errors
          console.log(error);
         
        }
      }
    } else {
      // Call the add API for saving a new address
      try {
        await addDeliverAddress(formData);
        // Call getDeliveryAddress function immediately after adding the new address
        getDeliveryAddress();
        setShowModal(false); // Close the modal after successful save
      } catch (error) {
        // showToast(TOAST_TYPES.error, error?.response?.data?.errors[0]?.message);
        // Handle error during save
        console.error('Error occurred during save:', error);
      }
    }
  };
  const { data: deliveryAddressData, refetch: getDeliveryAddress } = useQuery({
    queryKey: ["getDeliverAddress"],
    queryFn: getDeliverAddress,
  });

  const fetchDeliveryAddress = async () => {
    await getDeliveryAddress();
  };

  // handle marker click and update the latitude and longitude values
  const handleMarkerClick = (lat: number, lng: number) => {
    setFormData((prevData) => ({
      ...prevData,
      latitude: lat,
      longitude: lng,
    }));
  };
  return (
    <>
      <Head>
        <title>I am the Gardener | Address</title>
      </Head>
      <h5 className="px-6 py-4 text-xl border-b border-gray-350 border-solid">
        Select Delivery Address
      </h5>
      <div className="grid grid-cols-12 p-4 gap-5">

        {showModal && (
          <>
            <DeliveryAddressModal
              formData={formData}
              setFormData={setFormData}
              setShowModal={setShowModal}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </>
        )}
        <Address 
        formData={formData}
        setFormData={setFormData}
          setShowModal={setShowModal}
          showModal={showModal}/>
      </div>
    </>
  );
};

export default DelieveryAddress;

DelieveryAddress.getLayout = (page: any) => {
  return <MainLayout>
    <AccountSidebarLayout>{page}</AccountSidebarLayout>
  </MainLayout>;
};
