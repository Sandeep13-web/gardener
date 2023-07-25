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

  //Get cart Data
  const { data: cart } = useQuery<ICartItem>(["getCart"])

  //Get Config Data
  const { data: config, isInitialLoading } = useQuery({
    queryKey: ["getConfig"],
    queryFn: getConfig,
  });

  //Guest Register User
  const { register, handleSubmit: handleSubmitRegisterGuestUser, setValue, formState: { errors }, trigger } = useForm<IRegister>();

  //Password generated for guest user
  const [generatedPassword, setGeneratedPassword] = useState<string>(''); // Initialize password state as empty string

  // Function to generate and set the initial password value
  const generatePasswordValue = () => {
    if (!generatedPassword) {
      const password = generatePassword(8);
      setGeneratedPassword(password);
      setValue('password', password);
      setValue('confirm_password', password);
      return password;
    }
    // If the password is already generated, return the stored value
    return generatedPassword;
  };


  const onSubmitRegisterGuestUser: SubmitHandler<IRegister> = async (data) => {
    const generatedPwd = generatePasswordValue();
    data.password = generatedPwd;
    data.confirm_password = generatedPwd;

    // Set the guest user data in the state
    setGuestUserData(data);
    try {
      await registerGuestUser(data, true);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  // Selected payment method

  const [selectedPayment, setSelectedPayment] = useState<IPaymentMethod | null>(null);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);

  const handlePaymentChange = (payment: IPaymentMethod) => {
    setSelectedPayment(payment);
  };

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
                      <form onSubmit={handleSubmitRegisterGuestUser(onSubmitRegisterGuestUser)}>
                        <div className="grid grid-cols-12 gap-4">
                          <div className="flex flex-col col-span-6 mb-[15px]">
                            <label className="label">
                              <span className="label-text">First Name</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter Your First Name"
                              className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border rounded-e"
                              {...register('first_name', { required: 'First Name is required' })}
                            />
                            {
                              errors.first_name &&
                              <p className='text-error text-xs leading-[24px] mt-1'>{errors.first_name.message}</p>
                            }
                          </div>

                          <div className="flex flex-col col-span-6 mb-[15px]">
                            <label className="label">
                              <span className="label-text">Last Name</span>
                            </label>
                            <input
                              type="text"
                              {...register("last_name", { required: 'LastName is required.' })}
                              placeholder='Enter Your Last Name'
                              onBlur={() => trigger('last_name')}
                              className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border rounded-e"
                            />
                            {
                              errors.last_name &&
                              <p className='text-error text-xs leading-[24px] mt-1'>{errors.last_name.message}</p>
                            }
                          </div>

                          <div className="flex flex-col col-span-6 mb-[15px]">
                            <label className="label">
                              <span className="label-text">Phone Number</span>
                            </label>
                            <input
                              type="text"
                              {...register("mobile_number",
                                {
                                  required: "Phone number is required.",
                                  pattern: {
                                    value: /^[9]\d{9}$/,
                                    message: "Phone number must start with 9 and have 10 digits.",
                                  }
                                })}
                              onBlur={() => trigger('mobile_number')}
                              placeholder='Enter Your Phone Number'
                              className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border ${errors.mobile_number ? 'border-error' : 'border-gray-350'}`}
                            />
                            {
                              errors.mobile_number &&
                              <p className='text-error text-xs leading-[24px] mt-1'>{errors.mobile_number.message}</p>
                            }
                          </div>

                          <div className="flex flex-col col-span-6 mb-[15px]">
                            <label className="label">
                              <span className="label-text">Email</span>
                            </label>
                            <input
                              type="text"
                              {...register("email", {
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address.",
                                },
                              })}
                              placeholder='Enter Your Email'
                              className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border rounded-e"
                            />
                            {
                              errors.email &&
                              <p className='text-error text-xs leading-[24px] mt-1'>{errors.email.message}</p>
                            }
                          </div>

                          <div className="col-span-12 text-right">
                            <button
                              type="submit"
                              className="bg-primary text-base-100 font-bold py-[10px] px-[22px] uppercase rounded-full hover:bg-slate-850"
                            >
                              Next
                            </button>
                          </div>
                        </div>

                      </form>

                    </div>
                  </div>
                }


                <div className="collapse collapse-arrow p-4 border-solid border-[1px] border-orange-550 mb-[16px]">
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
                        <div className="col-span-12 sm:col-span-6 lg:col-span-4 border boder-solid boder-grey-500 min-h-[170px]">
                          <button
                            onClick={handleAddNew}
                            className="flex flex-col items-center justify-center w-full h-full gap-3 text-center hover:bg-gray-200"
                          >
                            <NewAddressIcon />
                            <span className="text-center">Add New Location</span>
                          </button>
                        </div>

                        {showModal && (
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
                                      onClick={() => setShowModal(!showModal)}
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
                        )}

                        {deliveryAddressData?.map((deliveryAddressContent: any, index: any) => (
                          <div className={`col-span-12 sm:col-span-6 lg:col-span-4 border boder-solid boder-grey-500 min-h-[170px] p-4 ${selectedDeliveryAddress === deliveryAddressContent.id ? 'border-lightGreen' : ''}`} key={deliveryAddressContent.id} onClick={() => handleSelectDeliveryAddress(deliveryAddressContent.id)}>
                            <h5 className="mb-2">{deliveryAddressContent?.customer}</h5>
                            <p className="mb-1 text-sm">{deliveryAddressContent?.title}</p>
                            <p className="mb-1 text-sm">{deliveryAddressContent?.detail?.formatted_address}</p>
                            <p className="mb-1 text-sm font-medium">Phone: {deliveryAddressContent?.contactNo}</p>
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
                      </div>
                    ) : (
                      // Guest User Address Section

                      <form action="" className="py-4" onSubmit={handleSubmit}>

                        <div className="h-[280px] mb-3">

                          <LeafletMap
                            lat={guestformData.latitude || 27.7172}
                            long={guestformData.longitude || 85.3240}
                            onChange={handleMarkerClickGuest}
                          />

                        </div>
                        <div className="flex flex-col col-span-12 mb-[15px]">
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
                            value={guestformData.title}
                            onChange={(e) => setGuestFormData({ ...guestformData, title: e.target.value })}
                            className={`px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border mb-4`}
                            required
                            maxLength={80}
                            pattern="^[a-zA-Z0-9, a-zA-Z0-9 ]*$"
                          />
                        </div>



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
                          value={guestformData.customer}
                          onChange={(e) => setGuestFormData({ ...guestformData, customer: e.target.value })}
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
                          value={guestformData.contact_no}
                          onChange={(e) => setGuestFormData({ ...guestformData, contact_no: e.target.value })}
                          pattern="(9[7,8])[0-9]{8}"

                          className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border mb-4"
                        />
                        {formData.contact_no.length > 0 && !phoneNumberRegex.test(formData.contact_no) && (
                          <p className="pb-2 text-sm text-red-500">Incorrect phone format</p>
                        )}

                      </form>

                    )}
                    {/* Address Section */}

                    <div className="text-right">
                      <button
                        type="submit"
                        className="bg-primary text-base-100 font-bold py-[10px] px-[22px] uppercase rounded-full hover:bg-slate-850"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>

                <div className="collapse collapse-arrow p-4 border-solid border-[1px] border-orange-550 mb-[16px]">
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
                    {config?.data?.paymentMethod.map((payment: IPaymentMethod) => (
                      <div className="form-control" key={payment.id}>
                        <label className="justify-start cursor-pointer label">
                          <input
                            type="radio"
                            name="radio-10"
                            className="radio checked:bg-primary w-[18px] h-[18px]"
                            checked={selectedPayment?.id === payment.id}
                            onChange={() => handlePaymentChange(payment)}
                          />
                          <div className="flex">
                            <Image
                              alt="Checkout Img"
                              width={200}
                              height={200}
                              src={payment.icon}
                              className="w-[30px] mx-3"
                            />
                            <span className="capitalize">{payment.title}</span>
                          </div>
                        </label>
                      </div>
                    ))}

                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-3xl font-bold">Order Note</h3>
                <textarea
                  className="textarea w-full rounded-none focus:outline-none border-[1px] border-gray-1200"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                >
                </textarea>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="py-[38px] px-[45px] bg-slate-150">
                <ul className="flex justify-between font-bold text-[16px] text-slate-850">
                  <li>Product</li>
                  <li>Total</li>
                </ul>
                <div className="my-[29px] py-[18px] border-t-[1px]  border-b-[1px] border-light-gray border-solid">
                  <ul className="">
                    {cart?.cartProducts.map((productData: any, index: any) => (
                      <li className="flex justify-between" key={index}>
                        <span> {productData?.product?.title} X {productData?.quantity} </span>
                        <span>NPR {productData.selectedUnit.sellingPrice *
                          productData.quantity} </span>
                      </li>

                    ))}
                  </ul>
                </div>
                <ul className="flex justify-between">
                  <li className="font-semibold text-[16px] text-slate-850">
                    Order Amount
                  </li>
                  <li className="text-[14px]">NPR {cart?.orderAmount}</li>
                </ul>
                <ul className="flex justify-between">
                  <li className="font-semibold text-[16px] text-slate-850">
                    Cart Subtotal
                  </li>
                  <li className="text-[14px]">NPR {cart?.subTotal}</li>
                </ul>
                <ul className="flex justify-between">
                  <li className="font-semibold text-[16px] text-slate-850">
                    Delivery Charge
                  </li>
                  <li className="text-[14px]">NPR {cart?.deliveryCharge
                  }</li>
                </ul>
                <div className="mt-[18px] mb-[33px] py-[18px] border-t-[1px]  border-b-[1px] border-light-gray border-solid">
                  <ul className=" flex justify-between mb-[20px]">
                    <li className="font-bold text-[18px]">Total</li>
                    <li className="font-bold text-primary">NPR {cart?.total}</li>
                  </ul>
                  <ul className="flex justify-between">
                    <li className="font-bold text-[18px]">Payment method</li>
                    {selectedPayment && (
                      <li className="font-bold text-[16px] text-gray-650">
                        {selectedPayment.title}
                      </li>
                    )}
                  </ul>
                </div>
              </div>

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
