import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";

const Home: NextPageWithLayout = () => {
  return <div>Home</div>;
};

export default Home;
Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
