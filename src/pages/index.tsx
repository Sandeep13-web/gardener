import React from "react";
import { NextPageWithLayout } from "./_app";
import MainLayout from "@/shared/main-layout";
import Banner from "@/shared/components/banner";

const Home: NextPageWithLayout = () => {
  return (
    <div className="text-9xl font-bold min-h-[300vh]">
      home
      <Banner />
    </div>
  );
};

export default Home;
Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
