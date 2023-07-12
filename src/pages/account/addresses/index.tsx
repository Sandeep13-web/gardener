import Breadcrumb from "@/components/Breadcrumb";
import AccountSidebar from "@/shared/components/accountSidebar";
import Button from "@/shared/components/button";
import NewAddressIcon from "@/shared/icons/common/NewAddressIcon";
import TrashIcon from "@/shared/icons/common/TrashIcon";
import MainLayout from "@/shared/main-layout";
import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const DelieveryAddress = () => {

  
  const [showModal, setShowModal] = useState<boolean>(false);
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
                <button
                  onClick={() => setShowModal(!showModal)}
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
                        <form action="" className="py-4">
                          <div className="h-[280px] mb-3"></div>
                          <label
                            htmlFor="addresstitle"
                            className="block mb-2 text-sm"
                          >
                            {" "}
                            Address Title *
                          </label>
                          <input
                            type="text"
                            id="addresstitle"
                            className="input input-bordered w-full h-[42px] text-sm mb-4"
                          />
                          <label
                            htmlFor="fullname"
                            className="block mb-2 text-sm"
                          >
                            {" "}
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="fullname"
                            className="input input-bordered w-full h-[42px] text-sm mb-4"
                          />
                          <label
                            htmlFor="number"
                            className="block mb-2 text-sm"
                          >
                            {" "}
                            Phone number *
                          </label>
                          <input
                            type="number"
                            id="number"
                            className="input input-bordered w-full h-[42px] text-sm mb-4"
                          />
                          <div className="flex items-center gap-2 mb-4">
                            <input type="checkbox" id="check" />
                            <label htmlFor="check" className="text-sm">
                              Set As Default
                            </label>
                          </div>
                          <div className="mt-2 flex gap-4">
                            <Button
                              onClick={() => setShowModal(!showModal)}
                              className="btn-error rounded-[30px] px-[30px] py-[11px]"
                            >
                              Cancel
                            </Button>
                            <Button className="btn rounded-[30px] px-[30px] py-[11px]">
                              Save
                            </Button>
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
                  <button
                    onClick={() => setShowModal(!showModal)}
                    className="flex items-center gap-1"
                  >
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
                  <button
                    onClick={() => setShowModal(!showModal)}
                    className="flex items-center gap-1"
                  >
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

DelieveryAddress.getLayout = (page: any) => {
  return <MainLayout>{page}</MainLayout>;
};
