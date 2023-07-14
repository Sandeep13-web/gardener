
import { IOrderDetails, IOrderProduct, IOrders } from "@/interface/order.interface";
import { getOrderDetails, getOrders } from "@/services/order.service";
import AccountSidebarLayout from "@/shared/account-sidebar-layout";
import MainLayout from "@/shared/main-layout";
import { useMutation, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import React, { useState } from "react";
import { parseISO, format } from "date-fns";
import Loader from "@/components/Loading";

const Order = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [orderDetails,setOrderDetails] = useState<IOrderDetails>();
  const [pageNumber, setPageNumber] = useState(1);
  const perPage = 10;

  const { data: orders, isLoading, error } = useQuery(
    ["getOrder", pageNumber, perPage], async () => 
      await getOrders(pageNumber, perPage)
        .then(response => {
          return response;
        })
  )

  const mutation = useMutation({
    mutationFn: getOrderDetails,
    onSuccess: (data) => {
      setOrderDetails(data.data);
    }
  })

  const changeDateFormat = (dateString: string) => {
    const date = parseISO(dateString);
    return <span>{ format(date, 'yyyy MMMM d hh:MM a') }</span>
  }

  const handleOrderDetail = (showOrder: boolean, orderId: number) => {
    setShowModal(showOrder);
    mutation.mutate(orderId);
  }



  return (
    <>
      <Head>
        <title>I am the Gardener | Orders</title>
      </Head>
      <h5 className="px-6 py-4 text-xl border-b border-solid border-gray-350">
        Orders
      </h5>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th className="table-header">Orders</th>
              <th className="text-center table-header">Date</th>
              <th className="text-center table-header">Status</th>
              <th className="text-center table-header">Total</th>
              <th className="text-center table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            { isLoading && (
              <tr>
                <td colSpan={5}>
                  <Loader />
                </td>
              </tr>
            )}
            {
              orders && orders?.data.map((order: IOrders) => (
                <tr key={`app-order-$${order.id}`}>
                  <td className="text-[14px] text-light-black">
                    #{ order.orderNumber }
                  </td>
                  <td className="text-center whitespace-nowrap">
                    { changeDateFormat(order.orderDate) }
                  </td>
                  <td className="text-center">
                    <span className="">{ order.status }</span>
                  </td>
                  <td className="text-center whitespace-nowrap">
                    NRS { order.total }
                  </td>
                  <td className="text-center">
                    <button onClick={() => handleOrderDetail(!showModal, order.id)}>
                      <span className="bg-primary text-center px-[30px] py-[7px] text-base-100 rounded-[4px] hover:bg-slate-850">
                        View
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
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
                              { orderDetails?.orderNumber }
                            </span>
                          </li>
                          <li>
                            <strong className="data-title">
                              Order Date:
                            </strong>
                            <span className="data-desc">
                              { orderDetails && changeDateFormat(orderDetails?.orderDate) }
                            </span>
                          </li>
                          <li>
                            <strong className="data-title">
                              Payment Method:
                            </strong>
                            <span className="data-desc">
                              { orderDetails?.paymentMethod?.title }
                            </span>
                          </li>
                          <li>
                            <strong className="data-title">
                              Payment Status:
                            </strong>
                            <span className="data-desc">
                              { orderDetails?.paymentStatus }
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
                        <h3 className="text-left font-normal text-[20px] mb-2">Customer Detail</h3>
                        <ul className="flex flex-col">
                          <li className="flex">
                            <strong className="data-title">
                              Name :
                            </strong>
                            <span>Nilam Shrestha</span>
                          </li>
                          <li className="flex"> 
                            <strong className="data-title">
                              Phone Number :
                            </strong>
                            <span>
                              9869856688
                            </span>
                          </li>
                          <li className="flex">
                            <strong className="data-title">
                              Address :
                            </strong>
                            <span>
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
                              <th className="text-right table-header">
                                Total Price
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            { orderDetails?.orderProducts.map((product: IOrderProduct) => (
                              <tr>
                                <td className="text-[14px] text-light-black">
                                  { product?.productName } X {product.quantity}
                                </td>
                                <td className="whitespace-nowrap">
                                  NRS { product?.price }
                                </td>
                                <td className="text-right whitespace-nowrap">
                                  NRS { product?.quantity * product?.price }
                                </td>
                              </tr>
                            )) }
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
                                NRS { orderDetails?.orderAmount }
                              </span>
                            </li>
                            <li className="flex justify-between pb-[6px] mb-[6px] border-solid border-b-[1px] border-borderGray">
                              <strong className="data-title">
                                Discount:
                              </strong>
                              <span className="data-desc-2">
                                NRS { orderDetails?.discount }
                              </span>
                            </li>
                            <li className="flex justify-between pb-[6px] mb-[6px] border-solid border-b-[1px] border-borderGray">
                              <strong className="data-title">
                                Subtotal:
                              </strong>
                              <span className="data-desc-2">
                                NRS { orderDetails?.subTotal }
                              </span>
                            </li>
                            <li className="flex justify-between pb-[6px] mb-[6px] border-solid border-b-[1px] border-borderGray">
                              <strong className="data-title">
                                Delivery Charge:
                              </strong>
                              <span className="data-desc-2">
                                NRS { orderDetails?.deliveryCharge }
                              </span>
                            </li>
                            <li className="flex justify-between pb-[6px] mb-[6px] border-solid border-b-[1px] border-borderGray">
                              <strong className="data-title">
                                Total Amount:
                              </strong>
                              <span className="data-desc-2">
                                NRS { orderDetails?.total }
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
    </>
  );
};

export default Order;

Order.getLayout = (page: any) => {
  return <MainLayout>
    <AccountSidebarLayout>{page}</AccountSidebarLayout>
  </MainLayout>;
};
