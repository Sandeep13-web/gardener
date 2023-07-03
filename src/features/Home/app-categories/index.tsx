import { ICartItem } from "@/interface/cart.interface";
import { IAppCategories } from "@/interface/home.interface";
import Card from "@/shared/components/card";
import SkeletonLoadingCard from "@/shared/components/skeleton/products";
import Title from "@/shared/components/title";
import { CardImg } from "@/shared/lib/image-config";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface IProps {
  prev: IAppCategories;
}

const AppCategories: React.FC<IProps> = ({ prev }) => {
  const { data: cart } = useQuery<ICartItem>(["getCart"]);

  return (
    <section className="my-[60px]">
      <Title type="title-section" text={prev.title} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {prev.products.map((product, index) => (
          <Card product={product} key={index} cartItem={cart?.cartProducts.find((item) => item?.product?.id === product?.id)} />
        ))}
      </div>
    </section>
  );
};

export default AppCategories;
