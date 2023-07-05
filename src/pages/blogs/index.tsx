import MainLayout from "@/shared/main-layout";
import React from "react";
import { NextPageWithLayout } from "../_app";
import Breadcrumb from "@/components/Breadcrumb";
import BlogsCard from "@/shared/components/blogsCard";
import Pagination from "@/shared/components/pagination";
import BlogSidebar from "@/shared/components/blogsSidebar";

const Blogs: NextPageWithLayout = () => {
  return (
    <div>
      <Breadcrumb />
      <div className="container  my-[60px]">
        <div className="grid grid-cols-12 md:gap-[30px]">
          <div className="order-last md:order-first col-span-12 md:col-span-3 right-sidebar">
            <BlogSidebar />
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <BlogsCard />
              <BlogsCard />
              <BlogsCard />
              <BlogsCard />
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
Blogs.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
