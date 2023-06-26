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

  return (
    <div>
      {
        isInitialLoading ? 
          <BannerSkeletonLoader /> :

          <>
            {data && data?.data && data?.data?.adbanners && <Swiper
              loop={true}
              className="mySwiper"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination , EffectFade]}
              effect="fade"
            >
              {data?.data?.adbanners.map((prev, index) => (
                <SwiperSlide key={`banner-images-${index}`} onClick={() => router.push(`/${prev.websiteUrl}`)}>
                  <Image
                    src={prev.bannerImage}
                    height={100}
                    width={2000}
                    style={{ maxHeight: "calc(100vh - 200px)", objectFit: "fill" }}
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
