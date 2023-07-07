import { fourzerofour } from "@/shared/lib/image-config";
import MainLayout from "@/shared/main-layout";
import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <div className="container flex flex-col items-center text-center">
        <Image src={fourzerofour} width={634} height={417} className="my-6" />
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-primary font-bold mb-4 md:mb-8">
          Something went wrong.
        </h1>
        <p className="text-sm">
          The page you were looking for could not be found.
        </p>
        <p className="text-sm mb-8">
          It might have been removed, renamed or did not exist in the first
          place.
        </p>
        <a href="" className=" btn btn-primary py-4 px-8 rounded-3xl mb-8">
          {" "}
          GO TO HOMEPAGE{" "}
        </a>
      </div>
    </div>
  );
};

export default NotFound;

NotFound.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
