import React, { ChangeEvent, useState } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/shared/components/card";
import { CardImg } from "@/shared/lib/image-config";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "@/interface/product.interfcae";
import { getOffers } from "@/services/offer.service";
import Link from "next/link";
import Image from 'next/image';
import Loader from "@/components/Loading";

const Offer: NextPageWithLayout = () => {

  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [offer, setOffer] = useState(1);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

const { data: offers, isLoading, error } = useQuery(
  ['getOffers', query, pageNumber, offer, maxPrice, minPrice, selectedOption], () =>
    getOffers(query, pageNumber, offer, maxPrice, minPrice)
      .then((response) => {
        console.log(response.data, response)
        if (selectedOption === "ascending") {
          if (response.data) {
            response.data.sort((firstProduct:any, secondProduct:any) => firstProduct.title.localeCompare(secondProduct.title));
          }
        } else if (selectedOption === "high") {
          if (response.data) {
            response.data.sort((firstProduct:any, secondProduct:any) =>
              secondProduct.unitPrice[0].sellingPrice - firstProduct.unitPrice[0].sellingPrice
            );
          }
        }else if (selectedOption === "low") {
          if (response.data) {
            response.data.sort((firstProduct: any, secondProduct: any) =>
          firstProduct.unitPrice[0].sellingPrice - secondProduct.unitPrice[0].sellingPrice
        );
          }
        }else if (selectedOption === "descending") {
          if (response.data) {
            response.data.sort((firstProduct:any, secondProduct:any) => secondProduct.title.localeCompare(firstProduct.title));
          }
        }
        return response;
      })
);

if (isLoading) {
  // Show loader while data is being fetched
  return <Loader />;
}
 
  return (
    <div>
      <Breadcrumb />
      <div className="offer-page">
        <div className="container">
          <div className="top-bar flex items-center justify-between bg-gray-250 mt-[60px] my-[20px] p-[10px]">
            <div className="products-count">
                <p className="text-gray-750 font-normal text-sm">There are {offers?.data?.length} products</p>
            </div>
            <div className="sorting flex items-center">
              <p className="text-gray-750 font-normal text-sm pr-3">Sort By:</p>
              <select defaultValue ={selectedOption} onChange={handleSelectChange}>
                <option value="">Please Select</option>
                <option value="ascending">A to Z</option>
                <option value="descending">Z to A</option>
                <option value="low">Price(Low &gt; High)</option>
                <option value="high">Price(High &lt; Low)</option>
              </select>
            </div> 
          </div>
          <section className="my-[60px]">
            <div>
              {offers?.data.length === 0 ? (
                <div className="message__section pt-0"> 
                  <div className="container">
                      <div className="message__section__inner">
                        <Image
                          src="/images/search-empty.svg"
                          alt=""
                          className="img-fluid mx-auto flex"
                          width={330} height={330}
                        />
                       <div className="text-center">
                          <h2 className="text-lg font-medium">No Products Found</h2>
                          <p> Thank you for using I am the Gardener. We will be in contact with more details shortly.</p>
                        </div>
                        <div className="text-center">
                          <Link href="/">
                            Continue Shopping
                           </Link> 
                        </div>
                      </div>
                  </div>
                </div>
               ) : (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {offers.data.map((item: any, index: any) => (
                          <Card
                            key={`app-cat-products-${index}`}
                            link={`/categories/${item.link}`}
                            type={item?.categoryTitle}
                            title={item?.title}
                            price={item?.unitPrice[0].sellingPrice}
                            image={CardImg}
                          />
                        ))}
                      </div>
               )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Offer;
Offer.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
