import AccountSidebar from "@/shared/components/accountSidebar";
import Breadcrumb from "@/shared/components/breadcrumb";
import Button from "@/shared/components/button";
import MainLayout from "@/shared/main-layout";
import React from "react";

const ChangePassword = () => {
  return (
    <div className="bg-gray-100">
      <Breadcrumb />
      <div className="container py-14">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 bg-white md:col-span-4 h-max">
            <AccountSidebar />
          </div>
          <div className="col-span-12 bg-white md:col-span-8">
            <h5 className="px-6 py-4 text-xl border-b border-solid border-gray-350">
              Change Password
            </h5>
            <form action="" className="px-6 py-6">
              <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12">
                  <input
                    type="text"
                    placeholder="OLD PASSWORD"
                    className="w-full h-10 input input-bordered "
                  />
                </div>
                <div className="col-span-12">
                  <input
                    type="text"
                    placeholder="NEW PASSWORD"
                    className="w-full h-10 input input-bordered "
                  />
                </div>
                <div className="col-span-12">
                  <input
                    type="text"
                    placeholder="CONFIRM PASSWORD"
                    className="w-full h-10 input input-bordered "
                  />
                </div>
                <div className="flex justify-between col-span-12">
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
