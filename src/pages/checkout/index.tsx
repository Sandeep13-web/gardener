import { IDeliveryAddress } from "@/interface/delivery-address.interface";
import { addDeliverAddress, deleteDeliverAddressById, getDeliverAddress, updateDeliveryAddressByAddressId } from "@/services/delivery-address.service";
import NewAddressIcon from "@/shared/icons/common/NewAddressIcon";
import MainLayout from "@/shared/main-layout";
import { generatePassword, getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
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
import ButtonLoader from "@/shared/components/btn-loading";
import { NextPageWithLayout } from "../_app";

const token = getToken();
const LeafletMap = dynamic(() => import('@/shared/components/leaflet'), {
  ssr: false,
});

interface CheckoutProps {
  guestUserData: IRegister | null;
}

const Checkout: NextPageWithLayout = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showLoginConfirmModal, setShowLoginConfirmModal] = useState<boolean>(false);
  const [checkoutGuestUserData, setCheckoutGuestUserData] = useState<IRegister | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const token = getToken()
  //Get Config Data
  const { data: config, isInitialLoading } = useQuery({
    queryKey: ["getConfig"],
    queryFn: getConfig,
  });

  const setGuestUserData = (data: IRegister | null) => {
    setCheckoutGuestUserData(data);
  };

  const [personalInfoSubmitted, setPersonalInfoSubmitted] = useState(false);
  const [addressCollapseDisabled, setAddressCollapseDisabled] = useState(true);
  const [addressFormValidated, setAddressFormValidated] = useState(false);
  const [paymentCollapseOpen, setPaymentCollapseOpen] = useState(false);

  const handleAddressSubmitGuest = (e: any) => {
    e.preventDefault();
    if (guestformData.latitude === 0 || guestformData.longitude === 0) {
      showToast(TOAST_TYPES.error, 'Please select a location');
      return;
    }
    setAddressFormValidated(true);
    if (guestformData.latitude && guestformData.longitude && guestformData.title) {
      setAddressFormValidated(false);
    } else {

      setAddressFormValidated(false);
    }

  };

  const handleNextButtonClick = () => {
    setPaymentCollapseOpen(true);
  };

  const [selectedPayment, setSelectedPayment] = useState<IPaymentMethod | null>(null);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);
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

  //Open Login Modal

  const openLoginModal = () => {
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

  const { data: deliveryAddressData, refetch: getDeliveryAddress } = useQuery({
    queryKey: ["getDeliverAddress"],
    queryFn: getDeliverAddress,
  });


  // Checkout Place order
  const handlePlaceOrder = async () => {
    if (token) {
      const selectedDeliveryAddressId = selectedDeliveryAddress;
      const selectedPaymentMethodId = selectedPayment?.id;
      checkout(selectedDeliveryAddressId, selectedPaymentMethodId, note)
        .then((res) => {
          switch (selectedPayment?.title) {
            case PaymentMethod.CASH_ON_DELIVERY:
              checkoutSuccessfulRedirect();
              break;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      if (checkoutGuestUserData) {
        const completeGuestUserData = {
          ...guestformData,
          ...checkoutGuestUserData,
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
                        personalInfoSubmitted={personalInfoSubmitted}
                        setPersonalInfoSubmitted={setPersonalInfoSubmitted}
                        guestUserData={checkoutGuestUserData}
                        setGuestUserData={setGuestUserData}
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
                          formData={formData}
                          setFormData={setFormData}
                          setShowModal={setShowModal}
                          showModal={showModal} />
                        <div className="text-right">
                          <button
                            type="submit"
                            className="bg-primary text-base-100 font-bold py-[10px] px-[22px] uppercase rounded-full hover:bg-slate-850"
                            onClick={handleNextButtonClick}
                          >
                            Next
                            {
                              personalInfoSubmitted &&
                              <ButtonLoader />
                            }
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
                            onClick={handleNextButtonClick}
                          >
                            Next
                            {
                              addressFormValidated &&
                              <ButtonLoader />
                            }
                          </button>
                        </div>
                      </div>
                    )}
                    {/* Address Section */}
                  </div>
                </div>

                <div className={`collapse collapse-arrow p-4 border-solid border-[1px] border-orange-550 mb-[16px] ${paymentCollapseOpen ? '' : 'pointer-events-none'}`}>
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


