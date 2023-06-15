import React from "react";
import { NextPageWithLayout } from "./_app";
import MainLayout from "@/shared/main-layout";
import Card from "@/shared/components/card";
import Title from "@/shared/components/title";
import CategoryCard from "@/shared/components/category-card";
import { CardImg, CategoryImg, DeliveryImg, LockImg, CallImg } from "@/shared/lib/image-config";
import Image from "next/image";

const Home: NextPageWithLayout = () => {
  return (
    <div className="container">
      <Title type="title-content" text="Home" />

      <div className="border border-[#f58220] rounded rounded-xs px-[20px]">
        <div className="grid grid-cols-1 sm-grid-cols-2 md:grid-cols-3 ">
          <div className="flex items-start px-[20px] py-[20px] md:py-[35px] relative gap-0">
            <Image src={DeliveryImg} alt="Static Image" width={50} height={50} className="w-[45px] mr-[10px]" />
            <Title
              type="title-section"
              className="text-[#253237] font-semibold text-normal capitalize leading-[22px] mb-0"
              text="Delivery Service"
              subTitle="Get plants delivered to your doorstep without hassle!"
              subClassName="leading-[20px] text-[#666] text-[13px]"
              mb="0"
            />
          </div>
          <div className="flex items-start  px-[20px] py-[20px] md:py-[35px] relative gap-0">
            <Image src={LockImg} alt="Static Image" width={50} height={50} className="w-[45px] mr-[10px]" />
            <Title
              type="title-section"
              className="text-[#253237] font-semibold text-normal capitalize leading-[22px] mb-0"
              text="100% Payment Secure"
              subTitle="Your payment are safe with us"
              subClassName="leading-[20px] text-[#666] text-[13px]"
              mb="0"
            />
          </div>
          <div className="flex items-start  px-[20px] py-[20px] md:py-[35px] relative gap-0">
            <Image src={CallImg} alt="Static Image" width={50} height={50} className="w-[45px] mr-[10px]" />
            <Title
              type="title-section"
              className="text-[#253237] font-semibold text-normal capitalize leading-[22px] mb-0"
              text="Support 10 Am - 6 Pm"
              subTitle="We are available all week from 10 Am to 6 Pm"
              subClassName="leading-[20px] text-[#666] text-[13px]"
              mb="0"
            />
          </div>
        </div>
      </div>

      <section className="my-[60px]">
        <Title type="title-section" text="Shop By Categories" subTitle="We’ve got something for everyone" />
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CategoryCard title="Plant With Pot" totalProducts={27} shopLink="#" image={CategoryImg} />
          <CategoryCard title="Plant With Pot" totalProducts={27} shopLink="#" image={CategoryImg} />
          <CategoryCard title="Plant With Pot" totalProducts={27} shopLink="#" image={CategoryImg} />
          <CategoryCard title="Plant With Pot" totalProducts={27} shopLink="#" image={CategoryImg} />
          <CategoryCard title="Plant With Pot" totalProducts={27} shopLink="#" image={CategoryImg} />
          <CategoryCard title="Plant With Pot" totalProducts={27} shopLink="#" image={CategoryImg} />
        </div>
      </section>

      <section className="my-[60px]">
        <Title type="title-section" text="Recent Addition" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Card link="#" type="asdas" title="asdasd" price={1260} image={CardImg} />
          <Card link="#" type="asdas" title="asdasd" price={1260} image={CardImg} />
          <Card link="#" type="asdas" title="asdasd" price={1260} image={CardImg} />
          <Card link="#" type="asdas" title="asdasd" price={1260} image={CardImg} />
          <Card link="#" type="asdas" title="asdasd" price={1260} image={CardImg} />
        </div>
      </section>

      <section className="my-[60px]">
        <Title type="title-section" text="Hanging Plants" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Card link="#" type="asdas" title="asdasd" price={1260} image={CardImg} />
          <Card link="#" type="asdas" title="asdasd" price={1260} image={CardImg} />
          <Card link="#" type="asdas" title="asdasd" price={1260} image={CardImg} />
          <Card link="#" type="asdas" title="asdasd" price={1260} image={CardImg} />
          <Card link="#" type="asdas" title="asdasd" price={1260} image={CardImg} />
        </div>
      </section>
    </div>
  );
};

export default Home;
Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
