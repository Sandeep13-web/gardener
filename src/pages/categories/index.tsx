import React from "react";
import MainLayout from "@/shared/main-layout";
import Title from "@/shared/components/title";
import {
    CardImg,
    CategoryImg,
    DeliveryImg,
    LockImg,
    CallImg,
} from "@/shared/lib/image-config";
import Image from "next/image";
import Banner from "@/shared/components/banner";
import Categories from "@/features/Home/categories";

import AppCategories from "@/features/Home/app-categories";
import { useQuery } from "@tanstack/react-query";
import { getHomeData } from "@/services/home.service";
import { IAppCategories, IHome } from "@/interface/home.interface";
import SkeletonLoadingCard from "@/shared/components/skeleton/products";
import { NextPageWithLayout } from "../_app";

const CategoriesPage: NextPageWithLayout = () => {

    const { data: categories, isInitialLoading }: any = useQuery({ queryKey: ['getCategories'] });


    return (
        <div className="text-lg font-bold min-h-[300vh]">
            <div className="container mt-6">
                <Categories
                    loading={isInitialLoading}
                    categories={categories?.data}
                />
            </div>
        </div>
    );
};
export default CategoriesPage;
CategoriesPage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};
