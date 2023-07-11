import Breadcrumb from "@/components/Breadcrumb";
import AccountSidebar from "@/shared/components/accountSidebar";
import Button from "@/shared/components/button";
import MainLayout from "@/shared/main-layout";
import React from "react";

const ChangePassword = () => {
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
              Change Password
            </h5>
            <form action="" className="px-6 py-6">
              <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12">
                  <input
                    type="text"
                    placeholder="OLD PASSWORD"
                    className="input input-bordered w-full h-10 "
                  />
                </div>
                <div className="col-span-12">
                  <input
                    type="text"
                    placeholder="NEW PASSWORD"
                    className="input input-bordered w-full h-10 "
                  />
                </div>
                <div className="col-span-12">
                  <input
                    type="text"
                    placeholder="CONFIRM PASSWORD"
                    className="input input-bordered w-full h-10 "
                  />
                </div>
                <div className="col-span-12 flex justify-between">
                  <Button className="primary-btn py-4 w-[50%]">Save</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

ChangePassword.getLayout = (page:any) => {
  return <MainLayout>{page}</MainLayout>;
};
