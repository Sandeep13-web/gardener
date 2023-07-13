import Home from "@/pages";
import { Props } from "@/pages/blogs/blog.props";
import CalendarIcon from "@/shared/icons/common/CalendarIcon";
import CaretDownIcon from "@/shared/icons/common/CaretDownIcon";
import UserIcon from "@/shared/icons/common/UserIcon";
import Usersvg from "@/shared/icons/common/UserSvg";
import { CardImg } from "@/shared/lib/image-config";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { parseISO, format } from "date-fns";

 const BlogsCard: React.FC<Props> = ({ blog }) => {

  const changeDateFormat = (dateString: string) => {
    const date = parseISO(dateString);
    return <span>{ format(date, 'd LLLL yyyy') }</span>
  } 

  return (
    <div className="card w-full bg-base-100 ">
      <Link href={`/blogs/${blog.slug}`}>
        <figure>
          <Image
            src={blog.thumbImage}
            alt="Plant"
            className="w-full h-auto aspect-[420/300]"
            width={216}
            height={270}
            quality={100}
            style={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link
          href={`/blogs/${blog.slug}`}
          className="block card-title mb-2 font-semibold text-2xl truncate hover:text-primary"
        >
          { blog.title }
        </Link>
        <div className="flex gap-2 items-center mb-4">
          <Link
            href={`/blogs/${blog.slug}`}
            className="group flex gap-1 items-center pr-2 border-r border-solid border-black text-sm hover:text-primary "
          >
            <Usersvg className="text-black hover:fill-blue-500" />
            { blog.author }
          </Link>
          <Link
            href={`/blogs/${blog.slug}`}
            className="group flex gap-1 items-center text-sm hover:text-primary"
          >
            <CalendarIcon className="text-black hover:fill-blue-500" />
            { changeDateFormat(blog.created_date.date) }
          </Link>
        </div>
        <p className="text-sm mb-4 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        >
        </p>
        <div className="card-actions">
          <Link
            href={`/blogs/${blog.slug}`}
            className="text-slate-850 transition-all delay-100 text-sm hover:text-primary hover:ml-[10px] flex items-center gap-1 font-normal"
          >
            Shop Now
            <span className="bg-primary  rounded-full flex items-center justify-center w-[12px] h-[12px] p-[2px]">
              <CaretDownIcon className="transform rotate-[270deg] text-white max-w-full h-auto" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogsCard;
