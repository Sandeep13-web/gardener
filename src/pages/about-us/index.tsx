import React from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";

const AboutUs: NextPageWithLayout = () => {
  return <div>AboutUs</div>;
};

export default AboutUs;
AboutUs.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
