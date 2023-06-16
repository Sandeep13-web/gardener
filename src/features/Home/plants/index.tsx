import Card from '@/shared/components/card'
import CategoryCard from '@/shared/components/category-card'
import Title from '@/shared/components/title'
import { CardImg, CategoryImg } from '@/shared/lib/image-config'
import React from 'react'

const Plants = () => {
    return (
        <section className="my-[60px]">
            <Title type="title-section" text="Hanging Plants" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                <Card
                    link="#"
                    type="asdas"
                    title="asdasd"
                    price={1260}
                    image={CardImg}
                />
                <Card
                    link="#"
                    type="asdas"
                    title="asdasd"
                    price={1260}
                    image={CardImg}
                />
                <Card
                    link="#"
                    type="asdas"
                    title="asdasd"
                    price={1260}
                    image={CardImg}
                />
                <Card
                    link="#"
                    type="asdas"
                    title="asdasd"
                    price={1260}
                    image={CardImg}
                />
                <Card
                    link="#"
                    type="asdas"
                    title="asdasd"
                    price={1260}
                    image={CardImg}
                />
            </div>
        </section>
    )
}

export default Plants