import { IDeliveryAddress } from '@/interface/delivery-address.interface';
import { deleteDeliverAddressById, getDeliverAddress } from '@/services/delivery-address.service';
import NewAddressIcon from '@/shared/icons/common/NewAddressIcon';
import { useQuery } from '@tanstack/react-query';
import React, { FC, useEffect, useState } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

interface IProps {
  setShowModal: (arg2: any) => void;
  showModal: boolean;

}

const Address: React.FC<IProps> = ({
  setShowModal,
  showModal
}) => {
  const [formData, setFormData] = useState<IDeliveryAddress>({
    address: '',
    contact_no: '',
    customer: '',
    isDefault: false,
    latitude: 27.7172,
    longitude: 85.3240,
    title: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const { data: deliveryAddressData, refetch: getDeliveryAddress } = useQuery({
    queryKey: ["getDeliverAddress"],
    queryFn: getDeliverAddress,
  });

  const handleAddNew = () => {
    // Reset the form data when adding a new address
    setFormData({
      address: '',
      contact_no: '',
      customer: '',
      isDefault: false,
      latitude: 0,
      longitude: 0,
      title: '',
    });
    // Set isEditing to false when adding
    setIsEditing(false);
    // Show the modal for adding
    setShowModal(true);
  };

   //Edit the delivery address list
   const handleEdit = (addressId: any) => {
    // For finfing  address object with the specified ID
    const addressData = deliveryAddressData.find((address: any) => address.id === addressId);
    if (addressData) {
      setFormData({
        ...formData,
        id: addressData?.id,
        title: addressData?.title,
        customer: addressData?.customer,
        contact_no: addressData?.contactNo,
        latitude: addressData?.latitude,
        longitude: addressData?.longitude,
        isDefault: addressData?.isDefault
      });
      // Set isEditing to true when editing
      setIsEditing(true);
      // Show the modal for editing
      setShowModal(true);
    } else {
      // Handle the case when addressData is not found
      console.error('Address not found.');
    }
  };

   //Delete Address
   const handleDeleteAddress = async (id: any) => {
    try {
      // Make the DELETE request
      await deleteDeliverAddressById(id);
      // Call the getDeliveryAddress function to update the data
      // getDeliveryAddress();
    } catch (error) {
      // Handle any errors
      console.error('Error deleting address:', error);
    }
  };


  return (
    <>
      {deliveryAddressData?.length < 3 ? (
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 border boder-solid boder-grey-500 min-h-[170px]">
          <button
            onClick={handleAddNew}
            className="w-full h-full flex gap-3 flex-col items-center justify-center text-center hover:bg-gray-200"
          >
            <NewAddressIcon />
            <span className="text-center">Add New Location</span>
          </button>
        </div>
      ) : null}
      {deliveryAddressData?.map((deliveryAddressContent: any, index: any) => (
        <div className={`col-span-12 sm:col-span-6 lg:col-span-4 border boder-solid boder-grey-500 min-h-[170px] p-4 ${deliveryAddressContent.isDefault ? 'border-green-50' : ''}`} key={deliveryAddressContent.id}>
          <h5 className="mb-2">{deliveryAddressContent?.customer}</h5>
          <p className="text-sm mb-1">{deliveryAddressContent?.title}</p>
          <p className="text-sm mb-1">{deliveryAddressContent?.detail?.formatted_address}</p>
          <p className="text-sm mb-1 font-medium">Phone: {deliveryAddressContent?.contactNo}</p>
          <div className="flex gap-6">
            <button className="flex items-center gap-1" onClick={() => handleDeleteAddress(deliveryAddressContent?.id)}>
              <FaTrashAlt className="text-gray-400" />
                    Remove
                  </button>
            <button
              onClick={() => handleEdit(deliveryAddressContent?.id)}
              className="flex items-center gap-1"
            >
              <FaPencilAlt className="text-gray-400" />
                    Edit
                  </button>
          </div>
        </div>
      ))}
    </>

  )
}

export default Address