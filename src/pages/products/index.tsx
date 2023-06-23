import MainLayout from "@/shared/main-layout";
import { NextPageWithLayout } from "../_app";
import Input from "postcss/lib/input";
import Image from 'next/image';

const ProductsPage: NextPageWithLayout = () => {
  return (
    <>
      <section className="my-[60px]">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-5">
              <Image
                          src="/images/product-img-1.png"
                          alt=""
                          className="img-fluid mx-auto flex"
                          width={330} height={330}
                        />
            </div>
            <div className="col-span-12 md:col-span-7">
              <h2 className="font-semibold text-2xl text-[#253237] mb-6">
                Cool Por 8
              </h2>
              <p className="font-bold text-sm color-[#253237] mb-2">
                Category:
                <a href="" className="text-primary">
                  <span className="font-normal">Pots</span>
                </a>
              </p>
              <ul className="flex my-5">
                <li className="mr-1 text-base text-[#cf2929]">
                  NPR <span> 150</span>
                </li>
                <li className="text-base text-primary font-semibold line-through mr-1">
                  NPR <span> 250</span>
                </li>
                <li className="text-base text-primary font-semibold ">
                  (<span>Excluding Tax</span>)
                </li>
              </ul>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                nam deleniti ullam quod facilis, adipisci obcaecati animi omnis
                molestias libero repudiandae sit provident in voluptas expedita
                amet, labore doloribus? Sapiente!
              </p>

              <div className="w-100 flex my-[30px]">
                <div className="h-[48px]  w-[80px] border border-solid border-[#e8e8e8] overflow-hidden relative text-[#8f8f8f]">
                  <button className="text-sm  cursor-pointer font-medium  absolute text-center w-6 h-12 top-0 left-0">
                    -
                  </button>
                  <input
                    type="text"
                    name="qtybutton"
                    className="overflow-visible w-[80px] text-sm text-center h-[48px]"
                    value={1}
                  />
                  <button className="text-sm cursor-pointer font-medium  absolute text-center w-6 h-12 top-0 right-0">
                    +
                  </button>
                </div>
                <div>
                  <button className="relative px-[55px] font-bold uppercase rounded-[30px] bg-accent text-base-100 ml-2.5 h-10 text-sm hover:bg-[#e57615] hover:text-base-100">
                    {" "}
                    + Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-[60px]">
        <div className="container">
          <a data-toggle="tab" className="active relative flex justify-center uppercase pb-3 text-lg font-bold text-center after:h-[2px] after:absolute after:left-0 after:right-0 after:bottom-[-1px] after:bg-transparent after:transition-all after:duration-300 after:ease-linear after:bg-primary text-[#253237] after:w-[250px] after:text-center after:m-auto">
            Product Description
          </a>
          <div className="tab-content overflow-hidden text-base bg-white leading-6 text-left py-10 px-8 border border-gray-200">
            <div id="productDetail" className="tab-pane active">
              <div className="product-anotherinfo-wrapper">
                <div className="text-justify description__text">
                  <p>
                    <strong>Plant care&nbsp;</strong>
                  </p>
                  <p> 
                    <strong>Light</strong>
                  </p>
                  <p>
                    <span className="font-normal">
                      Thrives in bright but indirect light.
                    </span>
                  </p>
                  <p>
                    <strong>Water</strong>
                  </p>
                  <p>
                    <strong>&nbsp;</strong>
                    <span className="font-normal">
                      Try to keep the soil of the plant moist. Avoid
                      overwatering.&nbsp;
                    </span>
                  </p>
                  <p>
                    <strong>Soil</strong>
                  </p>
                  <p>
                    <span className="font-normal">
                      Fertile Soil rich in humus can be prepared using a mixture
                      of cocopeats, garden Soil, vermiculite, perlite and
                      composts.
                    </span>
                  </p>
                  <p>
                    <strong>Fertilizer</strong>
                  </p>
                  <p>
                    <span className="font-normal">
                      Prefer a balanced Fertilizer, such as 20-10-20 or
                      20-20-20, with micronutrients applied at approximately
                      200ppm nitrogen.
                    </span>
                  </p>
                  <p>
                    <strong>Humidity</strong>
                  </p>
                  <p>
                    <span className="font-normal">
                      Thrives in high humidity .
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
ProductsPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
