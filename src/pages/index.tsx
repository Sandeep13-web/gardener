import React from "react";
import { NextPageWithLayout } from "./_app";
import MainLayout from "@/shared/main-layout";
import Card from "@/shared/components/card";
import Title from "@/shared/components/title";
import CategoryCard from "@/shared/components/category-card";

const Home: NextPageWithLayout = () => {
  return (
    <div className="container">
      <Title type="title-content" text="Home" />

      <section className="my-[60px]">
        <Title type="title-section" text="Shop By Categories" subTitle="We’ve got something for everyone" />
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CategoryCard title="Plant With Pot" totalProducts={27} shopLink="#" image="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
          <CategoryCard title="Plant With Pot" totalProducts={27} shopLink="#" image="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
          <CategoryCard title="Plant With Pot" totalProducts={27} shopLink="#" image="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
          <CategoryCard title="Plant With Pot" totalProducts={27} shopLink="#" image="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
          <CategoryCard title="Plant With Pot" totalProducts={27} shopLink="#" image="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
          <CategoryCard title="Plant With Pot" totalProducts={27} shopLink="#" image="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
        </div>
      </section>

      <section className="my-[60px]">
        <Title type="title-section" text="Recent Addition" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Card link="#" type="asdas" title="asdasd" price={1260} image="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
          <Card link="#" type="asdas" title="asdasd" price={1260} image="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
          <Card link="#" type="asdas" title="asdasd" price={1260} image="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
          <Card link="#" type="asdas" title="asdasd" price={1260} image="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
          <Card link="#" type="asdas" title="asdasd" price={1260} image="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
        </div>
      </section>

      <section className="my-[60px]">
        <Title type="title-section" text="Hanging Plants"/>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Card link="#" type="asdas" title="asdasd" price={1260} image="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
          <Card link="#" type="asdas" title="asdasd" price={1260} image="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
          <Card link="#" type="asdas" title="asdasd" price={1260} image="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
          <Card link="#" type="asdas" title="asdasd" price={1260} image="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
          <Card link="#" type="asdas" title="asdasd" price={1260} image="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
        </div>
      </section>
    </div>
  );
};

export default Home;
Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
