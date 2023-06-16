import MainLayout from "@/shared/main-layout";
import React from "react";
import { NextPageWithLayout } from "../_app";

const Blogs: NextPageWithLayout = () => {
  return <div>Blogs</div>;
};

export default Blogs;
Blogs.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
