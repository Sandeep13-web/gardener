import { IBlogItem } from "@/interface/blog.interface";
import { getBlogs } from "@/services/blog.service";
import SearchIcon from "@/shared/icons/common/SearchIcon";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { parseISO, format } from "date-fns";
import { useRouter } from "next/router";
import CategorySidebar from "../categorySidebar";
import TagSidebar from "../tagSidebar";

const BlogSidebar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  }

  const handleSearch = () => {
    const query = {
      type: "product",
      keyword: searchQuery,
    }
    const queryString = new URLSearchParams(query).toString();
    router.push(`search?${queryString}`);
  }

  const { data: featuredBlog } = useQuery({
    queryKey: ["getBlogs",],
    queryFn: async () => getBlogs(undefined, undefined, 1)
  })

  const changeDateFormat = (dateString: string) => {
    const date = parseISO(dateString);
    return <span>{format(date, 'd LLLL yyyy')}</span>
  }

  return (
    <div className="order-last col-span-12 md:order-first md:col-span-3 right-sidebar">
      <div className="mb-[20px]">
        <h3 className="right-sidebar-head">Search</h3>
        <div className="flex items-center mb-10 overflow-hidden border-2 border-solid border-primary rounded-3xl ">
          <input
            type="text"
            placeholder="Search Products"
            className="w-full input input-ghost"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button className="py-2 rounded-l-none rounded-r-lg btn btn-primary mb"
            onClick={handleSearch}
          >
            <SearchIcon />
          </button>
        </div>
        <h3 className="right-sidebar-head">Categories</h3>
        <CategorySidebar />
        <h3 className="right-sidebar-head">Recent Posts</h3>
        <div>
          {/* recent posts */}
          {
            featuredBlog && featuredBlog?.data.slice(0, 4).map((blog: IBlogItem, index: number) => (
              <div className="relative flex items-center mb-5" key={`featured-blogs-${index}`}>
                <Link href={`/blogs/${blog?.slug}`} className="absolute w-full h-full " aria-label={`blogs-${index}`} />
                <div className="aspect-square w-[90px] shrink-0">
                  <img
                    src={blog?.thumbImage}
                    alt=""
                  />
                </div>
                <div className="p-2 overflow-hidden">
                  <Link href={`/blogs//${blog?.slug}`} className="mb-1 text-sm font-bold truncate transition-all delay-100 duration-150 relative z-[1] hover:text-primary" aria-label={`blog-slug-${blog?.slug}`}>
                    {" "}
                    {blog?.title}
                  </Link>
                  <p className="text-sm">{changeDateFormat(blog?.created_date.date)}</p>
                </div>
              </div>
            ))
          }
        </div>
        <h3 className="right-sidebar-head">Tag</h3>
        <TagSidebar />
      </div>
    </div>
  );
};

export default BlogSidebar;
