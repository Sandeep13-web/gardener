import AccountSidebarLayout from "@/shared/account-sidebar-layout";
import AccountSidebar from "@/shared/components/accountSidebar";
import Breadcrumb from "@/shared/components/breadcrumb";
import Button from "@/shared/components/button";
import NewAddressIcon from "@/shared/icons/common/NewAddressIcon";
import TrashIcon from "@/shared/icons/common/TrashIcon";
import MainLayout from "@/shared/main-layout";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from "leaflet";
import 'leaflet-defaulticon-compatibility';
import { MarkerIcon } from "@/shared/lib/image-config";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/assets/css/leaflet.css';
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useForm } from "react-hook-form";
import { IDeliveryAddress } from "@/interface/delivery-address.interface";
import { addDeliverAddress, deleteDeliverAddressById, getDeliverAddress, updateDeliveryAddressByAddressId } from "@/services/delivery-address.service";

const DelieveryAddress = () => {
  const router = useRouter();
  const [isDefault, setIsDefault] = useState(false);
  const [updatedAddressData, setDeliveryAddressData] = useState([]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [position, setPosition] = useState<[number, number]>([28.3949, 84.1240]); // Coordinates for Nepal
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<IDeliveryAddress>({
    address: '',
    contact_no: '',
    customer: '',
    isDefault: false,
    latitude:0,
    longitude:0,
    title: ''
  });

  // Inside your component or a function
  const handleEdit = (addressId:any) => {
    // Find the address object with the specified ID
    console.log(deliveryAddressData,'de');
    const addressData = deliveryAddressData.find((address:any) => address.id === addressId);
    if (addressData) {
      // Set the initial form data based on the addressData
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


      // // Show the modal for editing
      // setShowModal(!showModal);
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

  const { data:deliveryAddressData} = useQuery({
    queryKey: ["getDeliverAddress"],
    queryFn: getDeliverAddress,
  });
  
  const getDeliveryAddress = async () => {
    const deliveryAddressData = await getDeliveryAddress();
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
  
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const updatedAddressData = await getDeliveryAddress();
    //       setDeliveryAddressData(updatedAddressData);
    //     } catch (error) {
    //       console.error('Error occurred while fetching delivery address data:', error);
    //     }
    //   };
    
    //   fetchData();
    // }, []);
   

  return (
    <>
      <Head>
        <title>I am the Gardener | Address</title>
      </Head>
      <h5 className="px-6 py-4 text-xl border-b border-gray-350 border-solid">
        Select Delivery Address
      </h5>
      <div className="grid grid-cols-12 p-4 gap-5">
      {deliveryAddressData?.length < 5 ? (

        <div className="col-span-12 sm:col-span-6 lg:col-span-4 border boder-solid boder-grey-500 min-h-[170px]">
          <button
            onClick={handleAddNew}
            className="w-full h-full flex gap-3 flex-col items-center justify-center text-center hover:bg-gray-200"
          >
            <NewAddressIcon />
            <span className="text-center">Add New Location</span>
          </button>
                {showModal && (
                  <>
                    <input
                      type="checkbox"
                      id="mymodal"
                      className="modal-toggle"
                      defaultChecked
                    />
                    <div className="modal">
                      <div className="rounded-lg modal-box p-4">
                        <div className="pb-2 border-b border-gray-300 ">
                          <h3 className="text-lg font-medium">
                            SET DELIEVERY LOCATION
                          </h3>
                          <p className="text-primary text-sm">
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
              </div>
            ) : null}
              {deliveryAddressData?.map((deliveryAddressContent: any, index: any) => (
                  <div className={`col-span-12 sm:col-span-6 lg:col-span-4 border boder-solid boder-grey-500 min-h-[170px] p-4 ${deliveryAddressContent.isDefault ? 'border-lightGreen' : ''}`} key={deliveryAddressContent.id}>

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
    </>
  );
};



export default DelieveryAddress;

DelieveryAddress.getLayout = (page: any) => {
  return <MainLayout> 
    <AccountSidebarLayout>{page}</AccountSidebarLayout>
  </MainLayout>;
};
