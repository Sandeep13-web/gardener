import { Logo, banner } from "@/shared/lib/image-config";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Banner = () => {
  return (
    <div>
      <Swiper
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
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide>
          <Image
            src={banner.one}
            height={100}
            width={2000}
            style={{ maxHeight: "calc(100vh - 200px)", objectFit: "fill" }}
            // object-fit={''}
            alt="banner"
            priority
            quality={100}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={banner.two}
            height={100}
            width={2000}
            style={{ maxHeight: "calc(100vh - 200px)", objectFit: "fill" }}
            // object-fit={''}
            alt="banner"
            priority
            quality={100}
          />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Image
            src={banner.three}
            height={100}
            width={2000}
            style={{ maxHeight: "calc(100vh - 200px)", objectFit: "fill" }}
            // object-fit={''}
            alt="banner"
            priority
            quality={100}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
