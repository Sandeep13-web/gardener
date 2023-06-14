import React from "react";
import { NextPageWithLayout } from "./_app";
import MainLayout from "@/shared/main-layout";

const Home: NextPageWithLayout = () => {
  return <div className="text-9xl font-bold">Home</div>;
};

export default Home;
Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
