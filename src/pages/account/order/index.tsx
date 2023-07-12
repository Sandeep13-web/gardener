import Breadcrumb from "@/components/Breadcrumb";
import AccountSidebar from "@/shared/components/accountSidebar";
import Button from "@/shared/components/button";
import MainLayout from "@/shared/main-layout";
import Link from "next/link";
import React, { useState } from "react";

const Order = () => {
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
                          <button onClick={() => setShowModal(!showModal)}>
                            <span className="bg-primary text-center px-[30px] py-[7px] text-base-100 rounded-[4px] hover:bg-slate-850">
                              View
                            </span>
                          </button>
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
                          <button onClick={() => setShowModal(!showModal)}>
                            <span className="bg-primary text-center px-[30px] py-[7px] text-base-100 rounded-[4px] hover:bg-slate-850">
                              View
                            </span>
                          </button>
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
                          <button onClick={() => setShowModal(!showModal)}>
                            <span className="bg-primary text-center px-[30px] py-[7px] text-base-100 rounded-[4px] hover:bg-slate-850">
                              View
                            </span>
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
                                <form
                                  method="dialog"
                                  className="modal-box md:min-w-[800px]"
                                >
                                  <h3 className="mb-[24px] pb-[24px] border-solid border-b-[1px] border-borderGray text-center text-[20px]">
                                    Order Detail
                                  </h3>
                                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-[26px]">
                                    ✕
                                  </button>
                                  <div className="modal-body">
                                    <div className="order-detail-inner order-detail-inner-div">
                                      <div className="grid grid-cols-12">
                                        <div className="col-span-12 md:col-span-6">
                                          <div className="list-detail-options has-checkbox">
                                            <h3></h3>
                                            <ul className="flex flex-col">
                                              <li className="order-number">
                                                <strong className="data-title">
                                                  Order ID:
                                                </strong>
                                                <span className="data-desc">
                                                  168474288LBFH
                                                </span>
                                              </li>
                                              <li>
                                                <strong className="data-title">
                                                  Order Date:
                                                </strong>
                                                <span className="data-desc">
                                                  2023 May 22 01:53 pm
                                                </span>
                                              </li>
                                              <li>
                                                <strong className="data-title">
                                                  Payment Method:
                                                </strong>
                                                <span className="data-desc">
                                                  Cash On Delivery
                                                </span>
                                              </li>
                                              <li>
                                                <strong className="data-title">
                                                  Payment Status:
                                                </strong>
                                                <span className="data-desc">
                                                  Pending
                                                </span>
                                              </li>
                                              <li>
                                                <strong className="data-title">
                                                  Order Status:
                                                </strong>
                                                <span className="data-desc">
                                                  Pending
                                                </span>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                          <div className="sm:py-0 py-[20px]">
                                            <h3>Customer Detail</h3>
                                            <ul className="flex flex-col">
                                              <li>
                                                <strong className="data-title">
                                                  Name :
                                                </strong>
                                                <span>Nilam Shrestha</span>
                                              </li>
                                              <li>
                                                <strong className="data-title">
                                                  Phone Number :
                                                </strong>
                                                <span className="data-desc">
                                                  9869856688
                                                </span>
                                              </li>
                                              <li>
                                                <strong className="data-title">
                                                  Address :
                                                </strong>
                                                <span className="data-desc">
                                                  Kupandol-10, Lalitpur, Nepal
                                                </span>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>

                                        <div className="col-span-12">
                                          <div className="overflow-x-auto">
                                            <table className="table table-zebra">
                                              {/* head */}
                                              <thead>
                                                <tr>
                                                  <th className="table-header w-[355px]">
                                                    Products
                                                  </th>
                                                  <th className="table-header">
                                                    Unit Price
                                                  </th>
                                                  <th className="table-header text-right">
                                                    Total Price
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td className="text-[14px] text-light-black">
                                                    Green Chilli 1 Kg - हरियो
                                                    खुर्सनी एक केजी X 1
                                                  </td>
                                                  <td className="whitespace-nowrap">
                                                    NRS 160
                                                  </td>
                                                  <td className="whitespace-nowrap text-right">
                                                    NRS 160
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                        <div className="col-span-12">
                                          <div className="grid grid-cols-12">
                                            <div className="col-span-12 md:col-span-6">
                                              <h3 className="py-[6px] font-bold text-superLightGray-350">
                                                Order Total
                                              </h3>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                              <ul className="flex flex-col pr-[15px] ">
                                                <li className="flex justify-between py-[6px] mb-[6px] border-solid border-b-[1px] border-borderGray">
                                                  <strong className="data-title">
                                                    Order Amount:
                                                  </strong>
                                                  <span className="data-desc-2">
                                                    NRS 160
                                                  </span>
                                                </li>
                                                <li className="flex justify-between pb-[6px] mb-[6px] border-solid border-b-[1px] border-borderGray">
                                                  <strong className="data-title">
                                                    Discount:
                                                  </strong>
                                                  <span className="data-desc-2">
                                                    NRS 20
                                                  </span>
                                                </li>
                                                <li className="flex justify-between pb-[6px] mb-[6px] border-solid border-b-[1px] border-borderGray">
                                                  <strong className="data-title">
                                                    Subtotal:
                                                  </strong>
                                                  <span className="data-desc-2">
                                                    NRS 140
                                                  </span>
                                                </li>
                                                <li className="flex justify-between pb-[6px] mb-[6px] border-solid border-b-[1px] border-borderGray">
                                                  <strong className="data-title">
                                                    Delivery Charge:
                                                  </strong>
                                                  <span className="data-desc-2">
                                                    NRS 50
                                                  </span>
                                                </li>
                                                <li className="flex justify-between pb-[6px] mb-[6px] border-solid border-b-[1px] border-borderGray">
                                                  <strong className="data-title">
                                                    Total Amount:
                                                  </strong>
                                                  <span className="data-desc-2">
                                                    NRS 190
                                                  </span>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                                <label
                                  className="modal-backdrop"
                                  htmlFor="mymodal"
                                ></label>
                              </div>
                            </>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;

Order.getLayout = (page: any) => {
  return <MainLayout>{page}</MainLayout>;
};
