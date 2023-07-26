import { ICartItem } from "@/interface/cart.interface";
import { IAppCategories } from "@/interface/home.interface";
import { getCartData } from "@/services/cart.service";
import Card from "@/shared/components/card";
import SkeletonLoadingCard from "@/shared/components/skeleton/products";
import Title from "@/shared/components/title";
import { CardImg } from "@/shared/lib/image-config";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Grid } from 'swiper';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
interface IProps {
  prev: IAppCategories;
}

const AppCategories: React.FC<IProps> = ({ prev }) => {
  const token = getToken();
  const { data: cart } = useQuery<ICartItem>(['getCart'], () => getCartData({ coupon: '' }));
  const { data: favList }: any = useQuery<any>(["wishlistProducts", token], { enabled: !!token });

  const updatedData = prev?.products?.map(item => ({
    ...item,
    isFav: favList && favList.data.length > 0 ? favList?.data.some((favItem: any) => favItem.product_id === item.id) : false,
    favId: favList && favList.data.length > 0 ? favList?.data.find((favItem: any) => favItem.product_id === item.id)?.id : 0
  }
  ));

  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  //handling prev and next of swiper category
  const handlePrevious = useCallback(() => {
    if (swiperRef) {
      swiperRef?.slidePrev();
    }
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    if (swiperRef) {
      swiperRef?.slideNext();
    }
  }, [swiperRef]);

  return (
    <section className="my-[60px]">
      <div className="relative flex items-center justify-between">
        <Title type="title-section" text={prev.title} />
        {
          prev?.products?.length > 10 && (
            <div className='!static productSwiper-navigation mb-[45px]'>
              <button
                // disabled={swiperRef?.isBeginning}
                onClick={handlePrevious}>
                <FaChevronLeft />
              </button>
              <button
                // disabled={swiperRef?.isEnd}
                onClick={handleNext}>
                <FaChevronRight />
              </button>
            </div>
          )
        }
      </div>
      <Swiper
        slidesPerView={5}
        grid={{
          rows: 2,
          fill: "row",
        }}
        pagination={false}
        spaceBetween={20}
        modules={[Grid]}
        className="productSwiper"
        onSwiper={setSwiperRef}
      >
        {updatedData?.map((product, index) => (
          <SwiperSlide key={`app-categories-${index}`}>
            <Card
              product={product}
              key={index}
              cartItem={cart?.cartProducts.find((item) => item?.product?.id === product?.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default AppCategories;
