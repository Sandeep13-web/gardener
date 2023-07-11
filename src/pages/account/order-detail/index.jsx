import React from "react";

const OrderDetail = () => {
  return (
    <>
      <button className="btn" onClick={() => window.my_modal_2.showModal()}>
        open modal
      </button>
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box md:min-w-[800px]">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕{" "}
          </button>
          <div class="modal-body">
            <div className="order-detail-inner order-detail-inner-div">
              <div className="grid grid-cols-12">
                <div className="col-span-12 md:col-span-6">
                  <div className="list-detail-options has-checkbox">
                    <h3></h3>
                    <ul className="flex flex-col">
                      <li className="order-number">
                        <strong className="data-title">Order ID:</strong>
                        <span className="data-desc">168474288LBFH</span>
                      </li>
                      <li>
                        <strong className="data-title">Order Date:</strong>
                        <span className="data-desc">2023 May 22 01:53 pm</span>
                      </li>
                      <li>
                        <strong className="data-title">Payment Method:</strong>
                        <span className="data-desc">Cash On Delivery</span>
                      </li>
                      <li>
                        <strong className="data-title">Payment Status:</strong>
                        <span className="data-desc">Pending</span>
                      </li>
                      <li>
                        <strong className="data-title">Order Status:</strong>
                        <span className="data-desc"> Pending</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <div className="customer-detail-holder">
                    <h3>Customer Detail</h3>
                    <ul className="flex flex-col">
                      <li>
                        <strong className="data-title">Name :</strong>
                        <span>Nilam Shrestha</span>
                      </li>
                      <li>
                        <strong className="data-title">Phone Number :</strong>
                        <span className="data-desc">9869856688</span>
                      </li>
                      <li>
                        <strong className="data-title">Address :</strong>
                        <span className="data-desc">
                          Kupandol-10, Lalitpur, Nepal
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-span-12">
                  <div className="overflow-x-auto">
                    <table className="table table-zebra">
                      {/* head */}
                      <thead>
                        <tr>
                          <th className="table-header">Products</th>
                          <th className="table-header text-center">Unit Price</th>
                          <th className="table-header text-center">Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-[14px] text-light-black">
                          Green Chilli 1 Kg - हरियो खुर्सनी एक केजी X 1
                          </td>
                          <td className="whitespace-nowrap text-center">
                          NRS 160
                          </td>
                          <td className="whitespace-nowrap text-center">
                          NRS 160
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col-span-12">
                  <div class="grid grid-cols-12">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 p-0">
                      <h3>Order Total</h3>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 p-0">
                      <ul class="order-detail-options order-total">
                        <li class="created-date">
                          <strong>Order Amount:</strong>
                          <span>NRS 160</span>
                        </li>
                        <li>
                          <strong> Discount: </strong>
                          <span>NRS 20</span>
                        </li>
                        <li class="created-date">
                          <strong>Subtotal:</strong>
                          <span>NRS 140</span>
                        </li>
                        <li>
                          <strong>Delivery Charge:</strong>
                          <span>NRS 50</span>
                        </li>
                        <li class="order-type total-price">
                          <strong>Total Amount:</strong>
                          <span>NRS 190</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default OrderDetail;
