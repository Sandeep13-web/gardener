import CategoryCard from '@/shared/components/category-card'
import CategorySkeletonLoading from '@/shared/components/skeleton/category'
import Title from '@/shared/components/title'
import { CategoryImg } from '@/shared/lib/image-config'
import React from 'react'

const Categories = () => {
    return (
        <section className="my-[60px]">
            <Title
                type="title-section"
                text="Shop By Categories"
                subTitle="We’ve got something for everyone"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <CategoryCard
                    title="Plant With Pot"
                    totalProducts={27}
                    shopLink="#"
                    image={CategoryImg}
                />
                <CategoryCard
                    title="Plant With Pot"
                    totalProducts={27}
                    shopLink="#"
                    image={CategoryImg}
                />
                <CategoryCard
                    title="Plant With Pot"
                    totalProducts={27}
                    shopLink="#"
                    image={CategoryImg}
                />
                <CategoryCard
                    title="Plant With Pot"
                    totalProducts={27}
                    shopLink="#"
                    image={CategoryImg}
                />
                <CategoryCard
                    title="Plant With Pot"
                    totalProducts={27}
                    shopLink="#"
                    image={CategoryImg}
                />
                <CategoryCard
                    title="Plant With Pot"
                    totalProducts={27}
                    shopLink="#"
                    image={CategoryImg}
                />
                <CategorySkeletonLoading />
            </div>
        </section>
    )
}

export default Categories