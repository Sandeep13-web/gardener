import React, { ChangeEvent, useState } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/shared/components/card";
import { CardImg } from "@/shared/lib/image-config";
import { useQuery } from "@tanstack/react-query";
import { getOffers } from "@/services/offer.service";
import Link from "next/link";
import Loader from "@/components/Loading";
import EmptyPage from "@/components/emptyPage";

const Offer: NextPageWithLayout = () => {

  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const offer = 1
  const maxPrice = null
  const minPrice = null

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

const { data: offers, isLoading, error } = useQuery(
  ['getOffers', query, pageNumber, offer, maxPrice, minPrice, selectedOption], () =>
    getOffers(query, pageNumber, offer, maxPrice, minPrice)
      .then((response) => {
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
                <p className="text-sm font-normal text-gray-750">There are {offers?.data?.length} products</p>
            </div>
            <div className="flex items-center sorting">
              <p className="pr-3 text-sm font-normal text-gray-750">Sort By:</p>
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
                  <EmptyPage />
               ) : (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {offers.data.map((product: any, index: any) => (
                          <Card
                          product = {product}
                          key={`app-cat-products-${index}`}
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
