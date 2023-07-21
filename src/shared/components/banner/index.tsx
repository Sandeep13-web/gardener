import { Logo, banner } from "@/shared/lib/image-config";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import { useQuery } from "@tanstack/react-query";
import { IHome } from "@/interface/home.interface";
import { useRouter } from "next/router";
import BannerSkeletonLoader from "../skeleton/banner";

const Banner = () => {
  const router = useRouter();
  const { data, isInitialLoading } = useQuery<IHome>({ queryKey: ['getHomeData'] });
  const handleOpenNewTab = (value: any) => {
    // Open the URL in a new tab
    window.open(value, '_blank');
  };
  return (
    <div>
      {
        isInitialLoading ?
          <BannerSkeletonLoader /> :

          <>
            {data && data?.data && data?.data?.banners && <Swiper
              loop={true}
              className="mySwiper aspect-[640/266]"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination, EffectFade]}
              effect="fade"
            >
              {data?.data?.banners.map((prev, index) => (
                <SwiperSlide key={`banner-images-${index}`} onClick={() => handleOpenNewTab(`${prev.websiteUrl}`)}>
                  <Image
                    src={prev.bannerImage}
                    height={100}
                    width={2000}
                    style={{ objectFit: "cover" }}
                    alt={prev.type}
                    priority
                    quality={100}
                  />
                </SwiperSlide>
              ))
              }

            </Swiper>}
          </>
      }
    </div>
  );
};

export default Banner;
