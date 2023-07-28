import { ICartItem } from "@/interface/cart.interface";
import { IAppCategories } from "@/interface/home.interface";
import { getCartData } from "@/services/cart.service";
import Card from "@/shared/components/card";
import SkeletonLoadingCard from "@/shared/components/skeleton/products";
import Title from "@/shared/components/title";
import { CardImg } from "@/shared/lib/image-config";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Grid } from 'swiper';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import HalfLeftCard from "./half-left-card";
interface IProps {
  prev: IAppCategories;
}

const AppCategories: React.FC<IProps> = ({ prev }) => {
  const token = getToken();
  const [nextDisable, setNextDisable] = useState<boolean>(false)
  const [prevDisable, setPrevDisable] = useState<boolean>(false)

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
    setNextDisable(false)
    if (swiperRef) {
      swiperRef?.slidePrev();
    }
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    setPrevDisable(false)
    if (swiperRef) {
      swiperRef?.slideNext();
    }
  }, [swiperRef]);
  // const prevRef = useRef<HTMLButtonElement>(null);
  // const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="my-[60px]">
      <div className="relative flex items-center justify-between">
        <Title type="title-section" text={prev.title} />
        {
          prev?.products?.length > 0 && (
            <div className='!static productSwiper-navigation mb-[45px]'>
              <button
                // ref={prevRef}
                disabled={prevDisable}
                onClick={handlePrevious}
              >
                <FaChevronLeft />
              </button>
              <button
                // ref={nextRef}
                disabled={nextDisable}
                onClick={handleNext}
              >
                <FaChevronRight />
              </button>
            </div>
          )
        }
      </div>
      <>
        {/* {
          prev.type === 'half_left' &&
          <HalfLeftCard />
        } */}
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
          onBeforeInit={() => setPrevDisable(true)}
          onReachBeginning={() => setPrevDisable(true)}
          onReachEnd={() => setNextDisable(true)}
          breakpoints={{
            0: {
              slidesPerView: 1,
              grid: {
                rows: 2
              },
              spaceBetween: 20,
              // navigation: {
              //   enabled: true,
              //   nextEl: nextRef.current,
              //   prevEl: nextRef.current
              // }
            },
            768: {
              slidesPerView: 3,
              grid: {
                rows: 2
              },
              spaceBetween: 20,
              // navigation: {
              //   enabled: true,
              //   nextEl: nextRef.current,
              //   prevEl: nextRef.current
              // }
            },
            1050: {
              slidesPerView: 5,
              grid: {
                rows: 2
              },
              spaceBetween: 20,
              // navigation: {
              //   enabled: true,
              //   nextEl: nextRef.current,
              //   prevEl: nextRef.current
              // }
            }
          }}
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
      </>
    </section>
  );
};

export default AppCategories;
