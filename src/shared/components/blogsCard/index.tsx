import Home from "@/pages";
import CalendarIcon from "@/shared/icons/common/CalendarIcon";
import CaretDownIcon from "@/shared/icons/common/CaretDownIcon";
import UserIcon from "@/shared/icons/common/UserIcon";
import Usersvg from "@/shared/icons/common/UserSvg";
import { CardImg } from "@/shared/lib/image-config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function BlogsCard() {
  return (
    <div className="card w-full bg-base-100 ">
        <Link href={``}>
      <figure>
        <Image
          src={CardImg}
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
      </figure></Link>
      <div className="card-body">
        <Link
          href={``}
          className="block card-title mb-2 font-semibold text-2xl truncate hover:text-primary"
        >
          Basic Care Tips for Succulents: Do’s and Don’ts
        </Link>
        <div className="flex gap-2 items-center mb-4">
          <Link
            href={``}
            className="group flex gap-1 items-center pr-2 border-r border-solid border-black text-sm hover:text-primary "
          >
            <Usersvg className="text-black hover:fill-blue-500" />
            Usha Tamang
          </Link>
          <Link
            href={``}
            className="group flex gap-1 items-center text-sm hover:text-primary"
          >
            <CalendarIcon className="text-black hover:fill-blue-500" />
            22 June, 2023
          </Link>
        </div>
        <p className="text-sm mb-4 line-clamp-2">
          Who doesn't love succulents? Certainly, we all do! Today let's learn
          the Do's and Don’ts of caring for succul..
        </p>
        <div className="card-actions">
          <Link
            href={``}
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
