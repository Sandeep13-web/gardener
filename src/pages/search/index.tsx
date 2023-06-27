import MainLayout from "@/shared/main-layout";
import { NextPageWithLayout } from "../_app";
import Input from "postcss/lib/input";
import Image from 'next/image';
import { getSearchResults } from "@/services/search.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Card from "@/shared/components/card";
import EmptyPage from "@/components/emptyPage";
import Breadcrumb from "@/components/Breadcrumb";
import { ChangeEvent, useState } from "react";
import Loader from "@/components/Loading";
import CategoryCard from "@/shared/components/category-card";

const SearchPage: NextPageWithLayout = () => {
  const router = useRouter();
  const page = 1
  const { type, keyword } = router.query;
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
 

  const { data: searchData, isLoading, error } = useQuery(['searchResults', type?.toString() || '', keyword?.toString() || ''], () =>
    getSearchResults(type?.toString() || '', keyword?.toString() || '', page)
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
    <Breadcrumb title='Search'/>
    <div className="offer-page">
      <div className="container">
        <div className="category"></div>
        <div className="product"></div>
        {/* Show the product data */}
        {type === 'product' && (
        <div>
          <div className="top-bar flex items-center justify-between bg-slate-150 mt-[60px] my-[20px] p-[10px]">
          <div className="products-count">
              <p className="text-sm font-normal text-gray-750">There are {searchData?.data?.length} products</p>
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
            {searchData?.data.length === 0 ? (
                <EmptyPage />
             ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {searchData?.data.map((product: any, index: any) => (
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
      )}
 {/* Show the category data */}
      {type === 'category' && (
        <section className="my-[60px]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {searchData?.data.map((item: any, index: number) => (
                <CategoryCard
                  key={`categories-${index}`}
                  title={item?.title}
                  totalProducts={item?.productCount}
                  shopLink={`/categories/${item?.slug}`}
                  image={item.icon}
                  />
              ))}
           </div>
        </section>
      )}
       
      </div>
    </div>
  </div>
  );
};

export default SearchPage;
SearchPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
