import SearchIcon from "@/shared/icons/common/SearchIcon";
import Link from "next/link";
import React from "react";

const BlogSidebar = () => {
  return (
    <div className="order-last md:order-first col-span-12 md:col-span-3 right-sidebar">
      <div className="mb-[20px]">
        <h3 className="right-sidebar-head">Search</h3>
        <div className="border-solid border-2 border-primary flex items-center rounded-3xl overflow-hidden mb-10 ">
          <input
            type="text"
            placeholder="Search Products"
            className="input input-ghost w-full"
          />
          <button className="py-2 rounded-l-none btn btn-primary rounded-r-lg mb">
            <SearchIcon />
          </button>
        </div>
        <h3 className="right-sidebar-head">Recent Posts</h3>
        <div>
          {/* recent posts */}
          <div className="relative flex items-center mb-5">
            <Link href={``} className=" absolute w-full h-full" />
            <div className="aspect-square w-[90px] shrink-0">
              <img
                src="https://assets.iamthegardener.com/storage/blog/thumb/64941e4ce4992.jpg"
                alt=""
              />
            </div>
            <div className="p-2 overflow-hidden">
              <h5 className="truncate text-sm font-bold mb-1">
                {" "}
                Basic Care Tips for Succulents: Do’s and Don’ts
              </h5>
              <p className="text-sm">JUNE 22, 2023</p>
            </div>
          </div>
          {/* recent posts */}
          <div className="relative flex items-center mb-5">
            <Link href={``} className=" absolute w-full h-full" />
            <div className="aspect-square w-[90px] shrink-0">
              <img
                src="https://assets.iamthegardener.com/storage/blog/thumb/64941e4ce4992.jpg"
                alt=""
              />
            </div>
            <div className="p-2 overflow-hidden">
              <h5 className="truncate text-sm font-bold mb-1">
                {" "}
                Basic Care Tips for Succulents: Do’s and Don’ts
              </h5>
              <p className="text-sm">JUNE 22, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
