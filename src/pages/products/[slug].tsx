import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import MainLayout from '@/shared/main-layout';
import Breadcrumb from '@/components/Breadcrumb';
import { useQuery } from '@tanstack/react-query';
import { getProductsFromSlug } from '@/services/product.service';


const ProductSlug = () => {
  const router = useRouter()
  const { slug } = router.query;
  const [descriptionContent, setDescriptionContent] = useState<string>('');
  const[moreInfoContent, setMoreInfoContent] = useState<string>('');
  const [taxMessage, setTaxMessage] = useState<string>('');


const { data, isLoading, error } = useQuery(
  ['getProductsFromSlug', slug],
  () => {
    if (slug) {
      return getProductsFromSlug(slug);
    }
  },
  {
    // Additional options for the useQuery hook
  }
);

useEffect(() => {
  if (data) {
    setDescriptionContent(data?.data?.description || '');
    setMoreInfoContent(data?.data?.moreInfo || '');
    const message = data?.data?.taxable ? 'Including Tax' : 'Excluding Tax';
      setTaxMessage(message);
  }
}, [data]);
  
  return (
    <>
    <Breadcrumb  title={data?.data?.title}/>
      <section className="my-[60px]">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-5">
              <Image
                          src={data?.data?.images[0]?.imageName}
                          alt=""
                          className="img-fluid mx-auto flex"
                          width={330} height={330}
                        />
            </div>
            <div className="col-span-12 md:col-span-7">
              <h2 className="font-semibold text-2xl text-darkBlack mb-6">
               {data?.data?.title}
              </h2>
              <p className="font-bold text-sm color-darkBlack mb-2">
                Category:
                <a href="" className="text-primary">
                  <span className="font-normal">{data?.data?.categoryTitle}</span>
                </a>
              </p>
              <ul className="flex my-5">

              {!data?.data?.unitPrice[0]?.hasOffer && (
        <li className="mr-1 text-base text-red-250">
           NPR
          <span>
            {data?.data?.unitPrice[0]?.sellingPrice}
          </span>
        </li>
      )}

      {data?.data?.unitPrice[0]?.hasOffer && (
        <>
          <li  className="text-base text-red-250 mr-1">
          NPR
            <span>
              {data?.data?.unitPrice[0]?.newPrice}
            </span>
          </li>

          <li className="text-base text-primary font-semibold line-through mr-1">
          NPR
            <span>
              {data?.data?.unitPrice[0]?.oldPrice}
            </span>
          </li>
        </>
      )}
                <li className="text-base text-primary font-semibold ">
                  ( <span dangerouslySetInnerHTML={{ __html: taxMessage }} />)
                </li>
              </ul>

              <p dangerouslySetInnerHTML={{ __html:descriptionContent, }} />

              <div className="w-100 flex my-[30px]">
                <div className="h-[48px]  w-[80px] border border-solid border-gray-950 overflow-hidden relative text-gray-250">
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
                  <button className="relative px-[55px] font-bold uppercase rounded-[30px] bg-accent text-base-100 ml-2.5 h-10 text-sm hover:bg-orange-250 hover:text-base-100">
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
          <a data-toggle="tab" className="active relative flex justify-center uppercase pb-3 text-lg font-bold text-center after:h-[2px] after:absolute after:left-0 after:right-0 after:bottom-[-1px] after:bg-transparent after:transition-all after:duration-300 after:ease-linear after:bg-primary text-darkBlack after:w-[250px] after:text-center after:m-auto">
            Product Description
          </a>
          <div className="tab-content overflow-hidden text-base bg-white leading-6 text-left py-10 px-8 border border-gray-200">
            <div id="productDetail" className="tab-pane active">
              <div className="product-anotherinfo-wrapper">
                <div className="text-justify description__text">
                <p dangerouslySetInnerHTML={{ __html:moreInfoContent, }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductSlug;
ProductSlug.getLayout = (page:any) => {
  return <MainLayout>{page}</MainLayout>;
};

