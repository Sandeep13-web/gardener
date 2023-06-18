import { getProductCategory } from '@/services/home.service'
import CategoryCard from '@/shared/components/category-card'
import CategorySkeletonLoading from '@/shared/components/skeleton/category'
import Title from '@/shared/components/title'
import { CategoryImg } from '@/shared/lib/image-config'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const Categories = () => {

    const { data: categories, isInitialLoading } = useQuery({ queryKey: ['getConfig'], queryFn: getProductCategory });


    return (
        <section className="my-[60px]">
            <Title
                type="title-section"
                text="Shop By Categories"
                subTitle="We’ve got something for everyone"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {isInitialLoading ?
                    <>
                        {[1, 2, 3, 4, 5, 6]?.map((item: any, index: number) => (
                            <CategorySkeletonLoading
                                key={`categories-${index}`}
                            />
                        ))}
                    </>
                    :
                    <>
                        {categories?.data?.slice(0, 6).map((item: any, index: number) => (
                            <CategoryCard
                                key={`categories-${index}`}
                                title={item?.title}
                                totalProducts={item?.productCount}
                                shopLink="#"
                                image={item.backgroundImage}
                            />
                        ))}
                    </>
                }
            </div>
        </section>
    )
}

export default Categories