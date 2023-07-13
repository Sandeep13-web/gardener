import MainLayout from "@/shared/main-layout";
import React, { useState } from "react";
import { NextPageWithLayout } from "../_app";
import Breadcrumb from "@/components/Breadcrumb";
import BlogsCard from "@/shared/components/blogsCard";
import Pagination from "@/shared/components/pagination";
import BlogSidebar from "@/shared/components/blogsSidebar";
import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "@/services/blog.service";
import { IBlogItem } from "@/interface/blog.interface";
import Loader from "@/components/Loading";
import EmptyPage from "@/components/emptyPage";

const Blogs: NextPageWithLayout = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const perPage = 4;

  const { data: blogs, isLoading, error } = useQuery(
    ["getBlogs", pageNumber, perPage], async () => 
      await getBlogs(pageNumber, perPage, undefined)
        .then(response => {
          return response;
      })
  )

  return (
    <div>
      <Breadcrumb />
      <div className="container  my-[60px]">
        <div className="grid grid-cols-12 md:gap-[30px]">
          <div className="order-last md:order-first col-span-12 md:col-span-3 right-sidebar">
            <BlogSidebar />
          </div>
          {
            isLoading && (
              <div className="col-span-12 md:col-span-9 text-center">
                <Loader />
              </div>
            )
          }
          { blogs && blogs?.data?.length === 0 ? (
            <EmptyPage />
          ) : (
            <div className="col-span-12 md:col-span-9">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                { blogs?.data.map((blog: IBlogItem, index: any) => (
                  <BlogsCard blog={blog} key={`app-blog-${index}`} />
                )) }
              </div>
              <Pagination />
            </div>
          ) }
        </div>
      </div>
    </div>
  );
};

export default Blogs;
Blogs.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
