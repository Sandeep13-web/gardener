import { IDeliveryAddress } from "@/interface/delivery-address.interface";
import { addDeliverAddress, deleteDeliverAddressById, getDeliverAddress, updateDeliveryAddressByAddressId } from "@/services/delivery-address.service";
import NewAddressIcon from "@/shared/icons/common/NewAddressIcon";
import MainLayout from "@/shared/main-layout";
import { generatePassword, getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";

import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { ICartItem } from "@/interface/cart.interface";
import { getConfig } from "@/services/home.service";
import { IPaymentMethod, PaymentFormProps } from "@/interface/home.interface";
import { checkout } from "@/services/checkout.service";
import { PaymentMethod } from "@/shared/enum";
import { useRouter } from "next/router";
import ConfirmationModal from "@/shared/components/confirmation-modal";
import LoginForm from "@/features/Auth/login-form";
import { IRegister } from "@/interface/register.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerGuestUser } from "@/services/auth.service";
import { setCookie } from "cookies-next";
import { getProfile } from "@/services/profile.service";
import dynamic from "next/dynamic";
import Image from "next/image";
import PersonalInformation from "@/features/Checkout/personal-information";
import OrderNote from "@/features/Checkout/order-note";
import CheckoutDetail from "@/features/Checkout/checkout-detail";
import CheckoutPayment from "@/features/Checkout/checkout-payment";
import GuestUserAddress from "@/features/Checkout/checkout-address/guest-user-address";
import DeliveryAddressModal from "@/shared/components/delivery-address-modal";
import Address from "@/features/Address";

const token = getToken();
const LeafletMap = dynamic(() => import('@/shared/components/leaflet'), {
  ssr: false,
});

const Checkout = ({ paymentMethods }: PaymentFormProps) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showLoginConfirmModal, setShowLoginConfirmModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState("");
  const token = getToken()

  // State to hold the data object for guest user registration
  const [guestUserData, setGuestUserData] = useState<IRegister | null>(null);



  //Get Config Data
  const { data: config, isInitialLoading } = useQuery({
    queryKey: ["getConfig"],
    queryFn: getConfig,
  });

  //Guest Register User
  const { register, handleSubmit: handleSubmitRegisterGuestUser, setValue, formState: { errors }, trigger } = useForm<IRegister>();

  //Password generated for guest user
  const [generatedPassword, setGeneratedPassword] = useState<string>(''); // Initialize password state as empty string

  const [personalInfoSubmitted, setPersonalInfoSubmitted] = useState(false);
  const [addressCollapseDisabled, setAddressCollapseDisabled] = useState(true);
  const [addressFormValidated, setAddressFormValidated] = useState(false);








  const handleAddressSubmitGuest = (e: any) => {
    debugger;
    console.log('guestaddress')
    e.preventDefault();
    if (guestformData.latitude === 0 || guestformData.longitude === 0) {
      showToast(TOAST_TYPES.error, 'Please select a location');
      return;
    }
    if (guestformData.latitude && guestformData.longitude && guestformData.title) {
      setAddressFormValidated(true);
    } else {

      setAddressFormValidated(false);
    }

  };

  // Selected payment method

  const [selectedPayment, setSelectedPayment] = useState<IPaymentMethod | null>(null);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);



  // Selected Delivery Address by id
  const handleSelectDeliveryAddress = (defaultAddressvalue: any) => {
    setSelectedDeliveryAddress(defaultAddressvalue);
  };

  const [position, setPosition] = useState<[number, number]>([28.3949, 84.1240]); // Coordinates for Nepal
  const [formData, setFormData] = useState<IDeliveryAddress>({
    address: '',
    contact_no: '',
    customer: '',
    isDefault: false,
    latitude: 0,
    longitude: 0,
    title: ''
  });

  const [guestformData, setGuestFormData] = useState<IDeliveryAddress>({
    address: '',
    contact_no: '',
    customer: '',
    isDefault: false,
    latitude: 0,
    longitude: 0,
    title: '',
    id: 0
  });

  //Edit the delivery address list
  const handleEdit = (addressId: any) => {
    // For finfing  address object with the specified ID
    const addressData = deliveryAddressData?.find((address: any) => address.id === addressId);
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

  //Open Login Modal

  const openLoginModal = () => {

    // Show the modal for adding
    setShowLoginConfirmModal(true);
  };


  const openLoginFormModal = () => {
    setShowLoginModal(true);
    setShowLoginConfirmModal(false);
  };

  // Function to toggle the login modal
  const toggleLoginModal = () => {
    setShowLoginModal((prev) => !prev);
  };


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
        console.error('Error occurred during update:', error);
      }
    } else {
      // API Call  for saving a new address
      try {
        await addDeliverAddress(formData);
        getDeliveryAddress();
        setShowModal(false);
      } catch (error) {
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

  const handleMarkerClickGuest = (lat: number, lng: number) => {
    setGuestFormData((prevData) => ({
      ...prevData,
      latitude: lat,
      longitude: lng,
    }));
  };

  //Delete Address
  const handleDeleteAddress = async (id: any) => {
    try {
      // Make the DELETE request
      await deleteDeliverAddressById(id);
      // Call the getDeliveryAddress function to update the data
      getDeliveryAddress();
    } catch (error) {
      // Handle any errors
      console.error('Error deleting address:', error);
    }
  };





  const handlePlaceOrder = async () => {
    if (token) {
      // Get the selected delivery address ID and payment method ID from the state
      const selectedDeliveryAddressId = selectedDeliveryAddress;
      const selectedPaymentMethodId = selectedPayment?.id;
      // Call the checkout API
      checkout(selectedDeliveryAddressId, selectedPaymentMethodId, note)
        .then((res) => {
          switch (selectedPayment?.title) {
            case PaymentMethod.CASH_ON_DELIVERY:
              checkoutSuccessfulRedirect();
              break;
          }
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    } else {
      if (guestUserData) {
        const completeGuestUserData = {
          ...guestformData,
          ...guestUserData,
        };
        try {
          const guestUserRegisterResponse = await registerGuestUser(completeGuestUserData, false);
          const selectedPaymentMethodId = selectedPayment?.id;
          setCookie('token', guestUserRegisterResponse?.data?.access_token);
          setCookie('isLoggedIn', true)
          checkout(guestUserRegisterResponse?.data?.deliveryAddress?.data?.id, selectedPaymentMethodId, note)
            .then((res) => {
              switch (selectedPayment?.title) {
                case PaymentMethod.CASH_ON_DELIVERY:
                  checkoutSuccessfulRedirect();
                  break;
              }
            })
            .catch((error) => {
              // Handle error
              console.error('Checkout API error:', error);
            });
        } catch (error) {
          console.error('Guest user registration failed:', error);
        }
      } else {
        console.error('Guest user data is missing.');
      }
    }

  };

  const checkoutSuccessfulRedirect = () => {
    goToCheckoutReviewPage(true);
    showToast(TOAST_TYPES.success, 'Checkout Successful.');
  };

  const goToCheckoutReviewPage = (success: any) => {
    router.push({
      pathname: '/checkout/review',
      query: { success: success.toString() },
    });
  };

  useEffect(() => {
    const defaultPayment = config?.data?.paymentMethod?.find((payment: IPaymentMethod) => payment.default);
    if (defaultPayment) {
      setSelectedPayment(defaultPayment);
    }

    const defaultAddress = deliveryAddressData?.find((address: any) => address.isDefault);
    if (defaultAddress) {
      setSelectedDeliveryAddress(defaultAddress.id);
    }
  }, [config?.data?.paymentMethod, deliveryAddressData]);

  return (
    <div>
      <div className="mt-[60px] mb-[40px]">
        <div className="container">
          <h3 className="mb-4 text-3xl font-bold">Your Order</h3>
          {
            !token &&
            <p>
              Already have an account?
              <a className="cursor-pointer text-primary" onClick={openLoginModal}>Log in</a>
            </p>

          }
          {showLoginConfirmModal && (
            <ConfirmationModal
              confirmHeading="Your previous cart items will be replaced with current cart items."
              modalType="delete_account_modal"
              btnName="Continue"
              showModal={showLoginConfirmModal}
              btnFunction={openLoginFormModal}
              cancelFuntion={() => setShowLoginConfirmModal(false)}
              isLoading={false}
            >
              <h5 className="mt-3 text-lg font-bold">Are you sure you want to login?</h5>
            </ConfirmationModal>
          )}
          {showLoginModal && (
            <>
              <input type="checkbox" id="new" className="modal-toggle" defaultChecked />
              <div className="modal">
                <div className="p-4 rounded-lg modal-box">
                  <LoginForm closeModal={toggleLoginModal}></LoginForm>
                </div>
                <label
                  className="modal-backdrop"
                  htmlFor="new"
                  onClick={() => setShowLoginModal(false)}
                ></label>
              </div>

            </>
          )}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-7">
              {/* Accordion Start */}
              <div>
                {
                  !token &&
                  <div className="collapse collapse-arrow p-4 border-solid border-[1px] border-gray-1200 mb-[16px]">
                    <input type="checkbox" name="address" />
                    <div className="flex items-center justify-between text-xl font-medium border-none collapse-title">
                      <div className="text-left col-10">
                        <h5 className="text-[16px] font-semibold">
                          1. Personal Information
                        </h5>
                      </div>
                      <div className="text-right col-2">
                        <span className="text-white text">
                          <TiTick
                            size={20}
                            className="rounded-full bg-gray-650"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="collapse-content ">
                      <PersonalInformation
                        addressCollapseDisabled={addressCollapseDisabled}
                        setAddressCollapseDisabled={setAddressCollapseDisabled}
                      />
                    </div>
                  </div>
                }


                <div className={`collapse collapse-arrow p-4 border-solid border-[1px] border-orange-550 mb-[16px] ${(!token && addressCollapseDisabled) ? 'pointer-events-none' : ''}`}>
                  <input type="checkbox" name="address" />
                  <div className="flex items-center justify-between text-xl font-medium border-none collapse-title">
                    <div className="text-left col-10">
                      {token ? (
                        <h5 className="text-[16px] font-semibold">
                          {" "}
                          1. Address{" "}
                        </h5>
                      ) : (
                        <h5 className="text-[16px] font-semibold">
                          {" "}
                          2. Address{" "}
                        </h5>
                      )}
                    </div>
                    <div className="text-right col-2">
                      <span className="text-white text">
                        <TiTick
                          size={20}
                          className="rounded-full bg-gray-650"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="collapse-content">
                    {token ? (
                      <div className="grid grid-cols-12 gap-5 p-4">


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
          setShowModal={setShowModal}
          showModal={showModal}/>
                        <div className="text-right">
                          <button
                            type="submit"
                            className="bg-primary text-base-100 font-bold py-[10px] px-[22px] uppercase rounded-full hover:bg-slate-850"
                          >
                            Next
                      </button>
                        </div>
                      </div>
                    ) : (
                      // Guest User Address Section
                      <div>

                        <form className="py-4" onSubmit={handleAddressSubmitGuest}>


                          <GuestUserAddress guestformData={guestformData} setGuestFormData={setGuestFormData} />

                        </form>
                        <div className="text-right">
                          <button
                            type="submit"
                            className="bg-primary text-base-100 font-bold py-[10px] px-[22px] uppercase rounded-full hover:bg-slate-850"
                          >
                            Next
                      </button>
                        </div>
                      </div>


                    )}
                    {/* Address Section */}


                  </div>
                </div>

                <div className={`collapse collapse-arrow p-4 border-solid border-[1px] border-orange-550 mb-[16px] ${addressFormValidated || addressCollapseDisabled ? 'pointer-events-none' : ''}`}>
                  <input type="checkbox" name="payment-method" />
                  <div className="flex items-center justify-between text-xl font-medium border-none collapse-title">
                    <div className="text-left col-10">
                      <h5 className="text-[16px] font-semibold">
                        {token ? (
                          <h5 className="text-[16px] font-semibold">
                            {" "}
                            2. Payment Method{" "}
                          </h5>
                        ) : (
                          <h5 className="text-[16px] font-semibold">
                            {" "}
                            3. Payment Method{" "}
                          </h5>
                        )}
                      </h5>
                    </div>
                    <div className="text-right col-2">
                      <span className="text-white text">
                        <TiTick
                          size={20}
                          className="rounded-full bg-gray-650"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="collapse-content">
                    <CheckoutPayment selectedPayment={selectedPayment} handlePaymentChange={setSelectedPayment} />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-3xl font-bold">Order Note</h3>
                <OrderNote
                  note={note}
                  setNote={setNote}
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-5">
              <CheckoutDetail selectedPayment={selectedPayment} />
              <div className="mt-[25px]">
                <button className="font-bold text-base-100 py-[18px] px-[20px] uppercase rounded-full cursor-pointer bg-primary w-full hover:bg-darkBlack" onClick={() => handlePlaceOrder()}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
Checkout.getLayout = (page: any) => {
  return <MainLayout>{page}</MainLayout>;
};
