import MainLayout from "@/shared/main-layout";
import { NextPageWithLayout } from "../_app";
import Breadcrumb from "@/components/Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { getWishlists } from "@/services/wishlist.service";
import Loader from "@/components/Loading";
import EmptyPage from "@/components/emptyPage";
import Card from "@/shared/components/card";
import { useState } from "react";

const Wishlist: NextPageWithLayout = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const perPage = 10;

    const { data: wishlist, isLoading } = useQuery(
        ['getWishlists', pageNumber, perPage], () => 
            getWishlists(pageNumber, perPage)
                .then((response) => {
                    return response
                })
    )
    if (isLoading) {
        return <Loader />
    }

    return (
        <div>
            <Breadcrumb title="Wishlist" />
            <div className="wishlist-page">
                <div className="container">
                    <section className="my-[60px]">
                        <div>
                            {wishlist?.data.length === 0 ? (
                                <EmptyPage />
                            ) : (
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                    {wishlist?.data.map((favProduct: any, index: any) => 
                                        <Card
                                            product={favProduct.product}
                                            key={`app-cat-products-${index}`}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Wishlist;
Wishlist.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>
}