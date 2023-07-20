import { IDeliveryAddress } from "@/interface/delivery-address.interface";
import { addDeliverAddress, deleteDeliverAddressById, getDeliverAddress, updateDeliveryAddressByAddressId } from "@/services/delivery-address.service";
import NewAddressIcon from "@/shared/icons/common/NewAddressIcon";
import MainLayout from "@/shared/main-layout";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { showToast, TOAST_TYPES } from "@/shared/utils/toast-utils/toast.utils";
import { useQuery } from "@tanstack/react-query";
import { MarkerIcon } from "@/shared/lib/image-config";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import 'leaflet-geosearch/assets/css/leaflet.css';
import 'leaflet/dist/leaflet.css';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { ICartItem } from "@/interface/cart.interface";
import { getConfig } from "@/services/home.service";
import { IPaymentMethod, PaymentFormProps } from "@/interface/home.interface";
import { checkout } from "@/services/checkout.service";
import { PaymentMethod } from "@/shared/enum";
import { useRouter } from "next/router";

const token = getToken();

const Checkout = ({ paymentMethods }: PaymentFormProps) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState("");
  //Get cart Data
  const { data: cart } = useQuery<ICartItem>(["getCart"])
  //Get Config Data
  const { data: config, isInitialLoading } = useQuery({
    queryKey: ["getConfig"],
    queryFn: getConfig,
  });
  // Selected payment method

  const [selectedPayment, setSelectedPayment] = useState<IPaymentMethod | null>(null);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);

  const handlePaymentChange = (payment: IPaymentMethod) => {
    setSelectedPayment(payment);
    console.log(payment)
  };

  // Selected Delivery Address by id
  const handleSelectDeliveryAddress = (defaultAddressvalue:any) => {
    setSelectedDeliveryAddress(defaultAddressvalue);
    console.log(defaultAddressvalue);
  };

  const [position, setPosition] = useState<[number, number]>([28.3949, 84.1240]); // Coordinates for Nepal
  const [formData, setFormData] = useState<IDeliveryAddress>({
    address: '',
    contact_no: '',
    customer: '',
    isDefault: false,
    latitude:0,
    longitude:0,
    title: ''
  });
 
  //Edit the delivery address list
  const handleEdit = (addressId:any) => {
    // For finfing  address object with the specified ID
    const addressData = deliveryAddressData?.find((address:any) => address.id === addressId);
    if (addressData) {
      setFormData({
        ...formData,
        id: addressData?.id,
        title: addressData?.title,
        customer: addressData?.customer,
        contact_no: addressData?.contactNo,
        latitude:addressData?.latitude,
        longitude:addressData?.longitude,
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

  interface MarkersProps {
    onMarkerClick: (lat: number, lng: number) => void;
    position: number[]; // Add the position prop to the interface
  }
  
  const Markers: React.FC<MarkersProps> = ({ onMarkerClick, position }) => {
    const [markerKey, setMarkerKey] = useState(0);
    const markerPosition: LatLngExpression = [position[0], position[1]];

    const customIcon = new L.Icon({
      iconUrl: MarkerIcon,
      iconSize: [50, 50],
    });

    const map = useMapEvents({
      click: (e) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        onMarkerClick(lat, lng);
        setMarkerKey((prevKey) => prevKey + 1);
      },
    });

    useEffect(() => {
      setMarkerKey((prevKey) => prevKey + 1);
    }, [position]);

    return <Marker key={markerKey} position={markerPosition} icon={customIcon} />;
  };

  const phoneNumberRegex = /^(97|98)\d{8}$/;
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.latitude === 0 || formData.longitude === 0) {
      // Show an error message for location selection
      console.error('Please select a location');
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
  
  //Delete Address
  const handleDeleteAddress = async (id:any) => {
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
  
  
  // Leaflet Geosearch
  const GeoSearch = () => {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();

      const searchControl = GeoSearchControl({
        provider: provider,
        showMarker: true,
        showPopup: false,
        marker: {
          icon: new L.Icon.Default(),
          draggable: false,
        },
        popupFormat: ({ query, result }: { query: any, result: any }) => result.label,
        maxMarkers: 1,
        retainZoomLevel: false,
        animateZoom: true,
        autoClose: false,
        searchLabel: 'Enter address',
        keepResult: true
      });

      map.addControl(searchControl);
      // Cleanup function
      return () => {
        map.removeControl(searchControl);
      };
    }, []);
    return null;
  };
  
  // Change cursor Drag
  
  const ChangeCursorOnDrag = () => {
    const map = useMap();

    useMapEvents({
      mouseover: () => {
        map.getContainer().style.cursor = 'pointer';
      },
      mouseout: () => {
        map.getContainer().style.cursor = '';
      },
      dragstart: () => {
        map.getContainer().style.cursor = 'grabbing';
      },
      dragend: () => {
        map.getContainer().style.cursor = 'pointer';
      },
    });

    return null;
  };

  const handlePlaceOrder = () => {
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
  };

  const checkoutSuccessfulRedirect = () => {
    goToCheckoutReviewPage(true);
    showToast(TOAST_TYPES.success, 'Checkout Successful.');
  };

  const goToCheckoutReviewPage = (success:any) => {
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
                <a className="text-primary cursor-pointer">Log in</a>
              </p>
          }
          <div className="grid grid-cols-12 gap-4">
            <div className="md:col-span-7 col-span-12">
              {/* Accordion Start */}
              <div>
                {
                  !token && 
                  <div className="collapse collapse-arrow p-4 border-solid border-[1px] border-borderGray mb-[16px]">
                  <input type="radio" name="address" />
                  <div className="collapse-title text-xl font-medium flex items-center justify-between border-none">
                    <div className="col-10 text-left">
                      <h5 className="text-[16px] font-semibold">
                        1. Personal Information
                      </h5>
                    </div>
                    <div className="col-2 text-right">
                      <span className="text text-white">
                        <TiTick
                          size={20}
                          className=" bg-gray-650 rounded-full"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="collapse-content grid grid-cols-12  gap-4">
                    <div className="flex flex-col col-span-6 mb-[15px]">
                      <label className="label">
                        <span className="label-text">First Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Your First Name"
                        name="f_name"
                        className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border rounded-e"
                      />
                      <p className="text-error text-xs leading-[24px] mt-1">
                        First Name is required.
                      </p>
                    </div>

                    <div className="flex flex-col col-span-6 mb-[15px]">
                      <label className="label">
                        <span className="label-text">Contact</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Your Last Name"
                        name="l_name"
                        className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border rounded-e"
                      />
                      <p className="text-error text-xs leading-[24px] mt-1">
                        Last Name is required.
                      </p>
                    </div>

                    <div className="flex flex-col col-span-6 mb-[15px]">
                      <label className="label">
                        <span className="label-text">Phone Number</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your Phone Number"
                        name="p_number"
                        className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border rounded-e"
                      />
                      <p className="text-error text-xs leading-[24px] mt-1">
                        Phone Number is required
                      </p>
                    </div>

                    <div className="flex flex-col col-span-6 mb-[15px]">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Your Email"
                        name="p_number"
                        className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border rounded-e"
                      />
                      <p className="text-error text-xs leading-[24px] mt-1">
                        Email is required
                      </p>
                    </div>

                    <div className="text-right col-span-12">
                      <button
                        type="submit"
                        className="bg-primary text-base-100 font-bold py-[10px] px-[22px] uppercase rounded-full hover:bg-slate-850"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
                }
                

                <div className="collapse collapse-arrow p-4 border-solid border-[1px] border-orange-550 mb-[16px]">
                  <input type="radio" name="address" />
                  <div className="collapse-title text-xl font-medium flex items-center justify-between border-none">
                    <div className="col-10 text-left">
                      <h5 className="text-[16px] font-semibold">
                        {" "}
                        2. Address{" "}
                      </h5>
                    </div>
                    <div className="col-2 text-right">
                      <span className="text text-white">
                        <TiTick
                          size={20}
                          className=" bg-gray-650 rounded-full"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="collapse-content">
                    
                    {/* Address Section */}
                    <div className="grid grid-cols-12 p-4 gap-5">
                    
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
                  <MapContainer center={position} zoom={13} style={{ height: "280px", width: "100%" }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Markers position={[formData.latitude, formData.longitude]} onMarkerClick={handleMarkerClick} />
                    <ChangeCursorOnDrag />
                    <GeoSearch />
                  </MapContainer>
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
                    <p className="text-red-500 text-sm pb-2">Incorrect phone format</p>
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
                  
                  
                  <div className="mt-2 flex gap-4">
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
              <p className="text-sm mb-1">{deliveryAddressContent?.title}</p>
              <p className="text-sm mb-1">{deliveryAddressContent?.detail?.formatted_address}</p>
              <p className="text-sm mb-1 font-medium">Phone: {deliveryAddressContent?.contactNo}</p>
              <div className="flex gap-6">
                  <button className="flex items-center gap-1"  onClick={() => handleDeleteAddress(deliveryAddressContent?.id)}>
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
                  <input type="radio" name="payment-method" />
                  <div className="collapse-title text-xl font-medium flex items-center justify-between border-none">
                    <div className="col-10 text-left">
                      <h5 className="text-[16px] font-semibold">
                        2. Payment method
                      </h5>
                    </div>
                    <div className="col-2 text-right">
                      <span className="text text-white">
                        <TiTick
                          size={20}
                          className=" bg-gray-650 rounded-full"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="collapse-content">
                  {config?.data?.paymentMethod.map((payment: IPaymentMethod) => (
        <div className="form-control" key={payment.id}>
          <label className="label cursor-pointer justify-start">
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-primary w-[18px] h-[18px]"
              checked={selectedPayment?.id === payment.id}
              onChange={() => handlePaymentChange(payment)}
            />
            <div className="flex">
              <img
                alt=""
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
                    className="textarea w-full focus:outline-none border-[1px] border-borderGray"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  >
                </textarea>
              </div>
            </div>
            <div className="md:col-span-5 col-span-12">
              <div className="py-[38px] px-[45px] bg-slate-150">
                <ul className="flex justify-between font-bold text-[16px] text-slate-850">
                  <li>Product</li>
                  <li>Total</li>
                </ul>
                <div className="my-[29px] py-[18px] border-t-[1px]  border-b-[1px] border-light-gray border-solid">
                  <ul className="">
                    {cart?.cartProducts.map((productData: any, index: any) => (
                        <li className="flex justify-between">
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
