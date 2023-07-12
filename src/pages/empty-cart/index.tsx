import { CartEmpty } from "@/shared/lib/image-config";
import MainLayout from "@/shared/main-layout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EmptyCart = () => {
  return (
    <div className="container">
      <div className="max-w-[520px] mx-auto text-center py-12">
        <div className="">
          <Image
            className=" w-64 md:w-80 mx-auto object-contain"
            src={CartEmpty}
            width={350}
            height={350}
            alt="empty-cart"
          />
        </div>
        <h1 className="text-xl md:text-2xl xl:text-3xl font-medium mb-4 lg:mb-6">
          Your shopping cart is currently empty
        </h1>
        <p className="text-md lg:text-lg mb-4">
          Thank you for using I am the Gardener. It looks like you haven&apos;t
          added any item.
        </p>
        <Link
          href={``}
          className="btn-primary py-3 px-6 rounded-3xl inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;

EmptyCart.getLayout = (page: any) => {
  return <MainLayout>{page}</MainLayout>;
};
