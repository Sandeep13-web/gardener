import Breadcrumb from "@/components/Breadcrumb";
import AccountSidebar from "@/shared/components/accountSidebar";
import NewAddressIcon from "@/shared/icons/common/NewAddressIcon";
import TrashIcon from "@/shared/icons/common/TrashIcon";
import MainLayout from "@/shared/main-layout";
import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const DelieveryAddress = () => {
  return (
    <div className="bg-gray-100">
      <Breadcrumb />
      <div className="container py-14">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-4 bg-white h-max">
            <AccountSidebar />
          </div>
          <div className="col-span-12 md:col-span-8 bg-white">
            <h5 className="px-6 py-4 text-xl border-b border-gray-350 border-solid">
              Select Delievery Address
            </h5>
            <div className="grid grid-cols-12 p-4 gap-5">
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 border boder-solid boder-grey-500 min-h-[170px]">
                <button className="w-full h-full flex gap-3 flex-col items-center justify-center text-center hover:bg-gray-200">
                  <NewAddressIcon />
                  <span className="text-center">Add New Location</span>
                </button>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 border boder-solid boder-grey-500 min-h-[170px] p-4">
                <h5 className="mb-2">Jwagal</h5>
                <p className="text-sm mb-1">jwagal banquet</p>
                <p className="text-sm mb-1">Sanepa-2 lalitpur,Nepal</p>
                <p className="text-sm mb-1 font-medium">Phone: 9809878899</p>
                <div className="flex gap-6">
                  <button className="flex items-center gap-1">
                    <FaTrashAlt className="text-gray-400" />
                    Remove
                  </button>
                  <button className="flex items-center gap-1">
                    <FaPencilAlt className="text-gray-400" />
                    Edit
                  </button>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 border boder-solid boder-grey-500 min-h-[170px] p-4 active:border-primary active-location">
                <h5 className="mb-2">Jwagal</h5>
                <p className="text-sm mb-1">jwagal banquet</p>
                <p className="text-sm mb-1">Sanepa-2 lalitpur,Nepal</p>
                <p className="text-sm mb-1 font-medium">Phone: 9809878899</p>
                <div className="flex gap-6">
                  <button className="flex items-center gap-1">
                    <FaTrashAlt className="text-gray-400" />
                    Remove
                  </button>
                  <button className="flex items-center gap-1">
                    <FaPencilAlt className="text-gray-400" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelieveryAddress;

DelieveryAddress.getLayout = (page:any) => {
  return <MainLayout>{page}</MainLayout>;
};
