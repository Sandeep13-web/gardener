import AccountSidebarLayout from "@/shared/account-sidebar-layout";
import Button from "@/shared/components/button";
import MainLayout from "@/shared/main-layout";
import Head from "next/head";
import React from "react";

const Profile = () => {
  return (
    <>
      <Head>
        <title>I am the Gardener | Profile</title>
      </Head>
      <h5 className="px-6 py-4 text-xl border-b border-solid border-gray-350">
        My Account Information
      </h5>
      <form action="" className="px-6 py-6">
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12">
            <label className="block mb-2" htmlFor="firstname">
              First Name
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full h-10 input input-bordered "
            />
          </div>
          <div className="col-span-12">
            <label className="block mb-2" htmlFor="firstname">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full h-10 input input-bordered "
            />
          </div>
          <div className="col-span-12">
            <label className="block mb-2" htmlFor="firstname">
              Email Address
            </label>
            <input
              type="text"
              disabled
              placeholder="Type here"
              className="w-full h-10 input input-bordered "
            />
          </div>
          <div className="col-span-12">
            <label className="block mb-2" htmlFor="firstname">
              Phone number
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full h-10 input input-bordered"
            />
          </div>
          <div className="flex justify-between col-span-12">
            <Button className="primary-btn py-4 w-[50%]">Save</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Profile;

Profile.getLayout = (page: any) => {
  return <MainLayout>
    <AccountSidebarLayout>{page}</AccountSidebarLayout>
  </MainLayout>;
};
