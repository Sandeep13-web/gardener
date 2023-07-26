import { IDeliveryAddress } from '@/interface/delivery-address.interface';
import { addDeliverAddress, getDeliverAddress, updateDeliveryAddressByAddressId } from '@/services/delivery-address.service';
import { showToast, TOAST_TYPES } from '@/shared/utils/toast-utils/toast.utils';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import React from 'react'

const LeafletMap = dynamic(() => import('@/shared/components/leaflet'), {
  ssr: false,
});

interface IProps {
  formData: IDeliveryAddress;
  setFormData: (arg1: any) => void;
  setShowModal: (arg2: any) => void;
  setIsEditing: (arg3: any) => void;
  isEditing: boolean;

}

const DeliveryAddressModal: React.FC<IProps> = ({
  formData,
  setFormData,
  setShowModal,
  setIsEditing,
  isEditing }) => {
  const handleMarkerClick = ({ latitude, longitude }: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      latitude,
      longitude,
    }));
  };

  const phoneNumberRegex = /^(97|98)\d{8}$/;

  const { data: deliveryAddressData, refetch: getDeliveryAddress } = useQuery({
    queryKey: ["getDeliverAddress"],
    queryFn: getDeliverAddress,
  });
  
  const fetchDeliveryAddress = async () => {
    await getDeliveryAddress();
  };
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
        // Handle error during update
        console.error('Error occurred during update:', error);
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

  return (
    <>
      <input
        type="checkbox"
        id="mymodal"
        className="modal-toggle"
        defaultChecked
      />
      <div className="modal">
        <div className="p-4 rounded-lg modal-box">
          <div className="pb-2 border-b border-gray-300 ">
            <h3 className="text-lg font-medium">
              SET DELIEVERY LOCATION
                                  </h3>
            <p className="text-sm text-primary">
              {" "}
                Drag the map to pin point your delievery lcoation{" "}
            </p>
          </div>


          <form action="" className="py-4" onSubmit={handleSubmit}>
            <div className="h-[280px] mb-3">

              <LeafletMap
                lat={formData.latitude || 27.7172}
                long={formData.longitude || 85.3240}
                onChange={handleMarkerClick}
              />
            </div>

            <label
              htmlFor="addresstitle"
              className="block mb-2 text-sm"
            >
              {" "}
                                    Address Title <span className="text-red-250">*</span>
            </label>

            <input
              type="text"
              id="addresstitle"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border mb-4`}
              required
              maxLength={80}
              pattern="^[a-zA-Z0-9, a-zA-Z0-9 ]*$"
            />

            <label
              htmlFor="fullname"
              className="block mb-2 text-sm"
            >
              {" "}
                                    Full Name
                                  </label>

            <input
              type="text"
              id="fullname"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              maxLength={40}
              pattern="^[a-zA-Z ]*$"
              className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border mb-4"
            />

            <label
              htmlFor="number"
              className="block mb-2 text-sm"
            >
              {" "}
                                    Phone number
                                  </label>

            <input
              type="number"
              id="number"
              value={formData.contact_no}
              onChange={(e) => setFormData({ ...formData, contact_no: e.target.value })}
              pattern="(9[7,8])[0-9]{8}"

              className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border mb-4"
            />
            {formData.contact_no.length > 0 && !phoneNumberRegex.test(formData.contact_no) && (
              <p className="pb-2 text-sm text-red-500">Incorrect phone format</p>
            )}
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="check"
                checked={formData.isDefault}
                onChange={(e) =>
                  setFormData({ ...formData, isDefault: e.target.checked })
                }
              />

              <label htmlFor="check" className="text-sm">
                Set As Default
                                    </label>

            </div>


            <div className="flex gap-4 mt-2">
              <button
                onClick={() => setShowModal(false)}
                className="btn-error rounded-[30px] px-[30px] py-[11px]"
              >
                Cancel
                                    </button>
              {isEditing ? ( // Check if the form is in edit mode
                <button type="submit" className="btn rounded-[30px] px-[30px] py-[11px]">
                  Update
                </button>
              ) : (
                <button type="submit" className="btn rounded-[30px] px-[30px] py-[11px]">
                  Save
                </button>
              )}
            </div>
          </form>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="mymodal"
        ></label>
      </div>
    </>
  )
}

export default DeliveryAddressModal