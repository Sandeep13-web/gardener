import { IDeliveryAddress } from '@/interface/delivery-address.interface';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
const LeafletMap = dynamic(() => import('@/shared/components/leaflet'), {
    ssr: false,
  });
//   interface IDeliveryAddress {
//     title: string;
//     customer: string;
//     contact_no: string;
//     latitude: number;
//     longitude: number;
//   }

  interface IProps{
    guestformData: IDeliveryAddress;
    setGuestFormData:(arg1: any) => void;
}


const GuestUserAddress: React.FC<IProps> = ({guestformData, setGuestFormData}) => {
    const handleMarkerClickGuest = ({latitude, longitude}:any) => {
        setGuestFormData((prevData:any) => ({
          ...prevData,
          latitude,
          longitude,
        }));
      };

    const phoneNumberRegex = /^(97|98)\d{8}$/;
    
    return (
        <>
            <div className="h-[280px] mb-3">

                <LeafletMap
                lat={guestformData?.latitude || 27.7172}
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
                {guestformData.contact_no.length > 0 && !phoneNumberRegex.test(guestformData.contact_no) && (
                <p className="pb-2 text-sm text-red-500">Incorrect phone format</p>
                )}
        </>
        
    )
}

export default GuestUserAddress