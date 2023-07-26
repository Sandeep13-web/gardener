import CategoryCard from '@/shared/components/category-card'
import CategorySkeletonLoading from '@/shared/components/skeleton/category'
import Title from '@/shared/components/title'
import React, { useCallback, useMemo, useState } from 'react'
import { Grid, Navigation } from 'swiper';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface IProps {
    loading: boolean;
    categories: any;
}
const Categories: React.FC<IProps> = ({ loading, categories }) => {
    const [swiperRef, setSwiperRef] = useState<SwiperClass>();

    //handling prev and next of swiper category
    const handlePrevious = useCallback(() => {
        if (swiperRef) {
            swiperRef?.slidePrev();
        }
    }, [swiperRef]);

    const handleNext = useCallback(() => {
        if (swiperRef) {
            swiperRef?.slideNext();
        }
    }, [swiperRef]);

    return (
        <section className="my-[60px] relative">
            <Title
                type="title-section"
                text="Shop By Categories"
                subTitle="We’ve got something for everyone"
            />
            {
                categories?.length > 6 && (
                    <div className='productSwiper-navigation'>
                        <button
                            // disabled={swiperRef?.isBeginning}
                            onClick={handlePrevious}>
                            <FaChevronLeft />
                        </button>
                        <button
                            // disabled={swiperRef?.isEnd}
                            onClick={handleNext}>
                            <FaChevronRight />
                        </button>
                    </div>
                )
            }
            {loading ?
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6]?.map((index: number) => (
                        <CategorySkeletonLoading
                            key={`categories-${index}`}
                        />
                    ))}
                </div>

                :
                <Swiper
                    slidesPerView={3}
                    grid={{
                        rows: 2,
                        fill: "row",
                    }}
                    pagination={false}
                    modules={[Grid]}
                    className="productSwiper"
                    onSwiper={setSwiperRef}
                >
                    {categories?.map((item: any, index: number) => (
                        <SwiperSlide key={`categories-${index}`}>

                            <CategoryCard
                                key={`categories-${index}`}
                                title={item?.title}
                                totalProducts={item?.productCount}
                                shopLink={`/categories/${item?.slug}`}
                                image={item.icon}
                            />

                        </SwiperSlide>
                    ))}
                </Swiper>
            }

        </section>
    )
}

export default Categories