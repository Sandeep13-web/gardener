import MainLayout from "@/shared/main-layout";
import React from "react";
import { NextPageWithLayout } from "../_app";
import Breadcrumb from "@/components/Breadcrumb";

const Blogs: NextPageWithLayout = () => {
  return (
  <div>
      <Breadcrumb />
  </div>
  );
};

export default Blogs;
Blogs.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
