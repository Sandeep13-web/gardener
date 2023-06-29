import React from "react";
import { TiTick } from "react-icons/ti";

const Checkout = () => {
  return (
    <div>
      <div className="mt-[60px] mb--[40px]">
        <div className="container">
          <h3 className="mb-4 text-3xl">ssss</h3>
          <div className="grid grid-cols-12 gap-4">
            <div className="md:col-span-7 col-span-12">
              {/* Accordion Start */}

              <div className="join join-vertical w-full">
                <div className="collapse collapse-arrow bg-base-200">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title text-xl font-medium flex items-center justify-between">
                    <div className="col-10 text-left">
                      <h5> 1. Address </h5>
                    </div>
                    <div className="col-2 text-right">
                      <span className="text text-white">
                        <TiTick
                          size={20}
                          className=" bg-orange-450 rounded-full"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="collapse-content">
                    jjjjjjjj
                    {/* <input
                      type="text"
                      className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border border-error"
                    /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 col-span-12">sssssss</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
