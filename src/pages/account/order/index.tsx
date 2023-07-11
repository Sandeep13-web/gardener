import Breadcrumb from "@/components/Breadcrumb";
import AccountSidebar from "@/shared/components/accountSidebar";
import Button from "@/shared/components/button";
import MainLayout from "@/shared/main-layout";
import Link from "next/link";
import React from "react";

function Order() {

  return (
    <div className="bg-gray-100">
      <Breadcrumb />
      <div className="container py-14">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-4 bg-white h-max">
            <AccountSidebar />
          </div>
          <div className="col-span-12 md:col-span-8 bg-white">
            <h5 className="px-6 py-4 text-[15px] border-b border-gray-350 border-solid uppercase font-bold">
              My Account Information
            </h5>
            <div className="grid grid-cols-12 px-6 py-6">
              <div className="col-span-12">
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    {/* head */}
                    <thead>
                      <tr>
                        <th className="table-header">Orders</th>
                        <th className="table-header text-center">Date</th>
                        <th className="table-header text-center">Status</th>
                        <th className="table-header text-center">Total</th>
                        <th className="table-header text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-[14px] text-light-black">
                          #168474288LBFH
                        </td>
                        <td className="whitespace-nowrap text-center">
                          2023 May 22 01:53 Pm
                        </td>
                        <td className="text-center">
                          <span className="">Pending</span>
                        </td>
                        <td className="whitespace-nowrap text-center">
                          NRS 190
                        </td>
                        <td className="text-center">
                          <Link href={""}>
                            <span className="bg-primary text-center px-[30px] py-[7px] text-base-100 rounded-[4px] hover:bg-slate-850">
                              View
                            </span>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-[14px] text-light-black">
                          #168474288LBFH
                        </td>
                        <td className="whitespace-nowrap text-center">
                          2023 May 22 01:53 Pm
                        </td>
                        <td className="text-center">
                          <span className="">Pending</span>
                        </td>
                        <td className="whitespace-nowrap text-center">
                          NRS 190
                        </td>
                        <td className="text-center">
                          <Link href={""}>
                            <span className="bg-primary text-center px-[30px] py-[7px] text-base-100 rounded-[4px] hover:bg-slate-850">
                              View
                            </span>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-[14px] text-light-black">
                          #168474288LBFH
                        </td>
                        <td className="whitespace-nowrap text-center">
                          2023 May 22 01:53 Pm
                        </td>
                        <td className="text-center">
                          <span className="">Pending</span>
                        </td>
                        <td className="whitespace-nowrap text-center">
                          NRS 190
                        </td>
                        <td className="text-center">
                          <Link href={""}>
                            <span className="bg-primary text-center px-[30px] py-[7px] text-base-100 rounded-[4px] hover:bg-slate-850">
                              View
                            </span>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-span-12">
                <dialog id="my_modal_3" className="modal">
                  <form method="dialog" className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">
                      Press ESC key or click on ✕ button to close
                    </p>
                  </form>
                </dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;

Order.getLayout = (page: any) => {
  return <MainLayout>{page}</MainLayout>;
};
