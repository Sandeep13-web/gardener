import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import { FaListUl } from 'react-icons/fa'

import { NextPageWithLayout } from '@/pages/_app';
import MainLayout from '@/shared/main-layout';
import Card from '@/shared/components/card';
import Pagination from '@/shared/components/pagination';
import { CardImg } from '@/shared/lib/image-config'
import CardLg from '@/shared/components/card-lg';
import { useState } from 'react';


const CategoryDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const { slug } = router.query
    const [grid, setGrid] = useState<boolean>(true)

    const { data: categories, isInitialLoading: loading }: any = useQuery({ queryKey: ['getCategories'] });

    return (
        <>
            <div className='product-page-banner'>
                <div className="container">
                    <h2 className='text-slate-850 text-[30px] capitalize font-semibold'>Plant With Pot</h2>
                    <div className="text-base breadcrumbs">
                        <ul className='justify-center'>
                            <li>
                                <Link href="/" className='text-slate-850 transition-all delay-150 duration-300 hover:!no-underline hover:text-primary'>Home</Link>
                            </li>
                            {/* <li><Link href={'#'}>Documents</Link></li> */}
                            <li className='text-slate-850'>Plant With Pot</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='container my-[60px]'>
                <div className="grid grid-cols-12 md:gap-[30px]">
                    <div className='order-last md:order-first col-span-12 md:col-span-3 right-sidebar'>
                        <div className='mb-[20px]'>
                            <h3 className='right-sidebar-head'>
                                Filter By
                            </h3>
                            <div>
                                <h4 className='text-slate-850 font-semibold font-base mb-3.5'>Categories</h4>
                                <ul className='pl-4'>
                                    {
                                        categories?.data?.map((item: any, index: number) => (
                                            <li key={`categories-${index}`} className='pb-2'>
                                                <Link href={`/categories/${item?.slug}`}
                                                    className={`block text-gray-550 font-semibold text-[15px] leading-[22px] transition-all delay-100 duration-300 hover:text-primary pb-2 capitalize ${item?.slug == slug && 'text-primary'}`}
                                                >
                                                    {item?.title}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className='mt-3.5'>
                                <h4 className='text-slate-850 font-semibold font-base mb-3.5'>Price</h4>
                                <div>
                                    <span className='text-sm'>NPR 0 - NPR 3000</span>
                                    <div className='mt-[20px] mb-3'>
                                        <input type="range" min={0} max="100" value="40" className="range range-primary h-[4px]" />
                                    </div>
                                    <button className='btn btn-primary w-full font-bold px-[22px] py-[13px] rounded-[50px] text-white text-lg uppercase tracking-[1px] leading-[1]'>Filter</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className='right-sidebar-head'>
                                Tag
                            </h3>
                            <div className='flex flex-wrap'>
                                <Link href={`/tag?id=[id]`}
                                    className='border border-gray-350 px-[25px] py-[10px] rounded-[30px] bg-white capitalize m-1 text-gray-550 text-sm leading-[20px] transition-all delay-100 duration-300 hover:bg-primary hover:text-white hover:border-primary'
                                >Birthdays</Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-12 md:col-span-9'>
                        <div className='flex flex-col sm:flex-row px-[30px] py-[10px] mb-[30px] bg-slate-150'>
                            <div className='flex-1 flex items-center mb-4 sm:mb-0 gap-[15px]'>
                                <div className="tabs gap-[15px]">
                                    <button
                                        className={`tab tab-active p-0 ${grid ? 'text-primary' : 'text-zinc-600'} hover:text-primary`}
                                        onClick={() => setGrid(true)}
                                    ><BsFillGrid3X3GapFill className='w-[18px] h-auto' /></button>  {/** Active status toggle remain */}
                                    <button
                                        className={`tab p-0 ${!grid ? 'text-primary' : 'text-zinc-600'} hover:text-primary`}
                                        onClick={() => setGrid(false)}
                                    ><FaListUl className='w-[18px] h-auto' /></button>
                                </div>
                                <p className='text-gray-750 text-sm leading-[20px] p-2'>There Are 20 Products.</p>
                            </div>
                            <div className='flex items-center gap-[10px]'>
                                <p className='text-gray-750 text-sm leading-[20px] p-2'>Sort By:</p>
                                dropdown/select
                            </div>
                        </div>
                        {/* {
                            grid ?
                                <div className='grid grid-cols-12 gap-[30px]'>
                                    <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'>
                                        <Card
                                            // link="#"
                                            type="asdas"
                                            title="asdasd"
                                            price={1260}
                                            image={CardImg}
                                        />
                                    </div>
                                    <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'>
                                        <Card
                                            // link="#"
                                            type="asdas"
                                            title="asdasd"
                                            price={1260}
                                            image={CardImg}
                                        />
                                    </div>
                                    <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'>
                                        <Card
                                            // link="#"
                                            type="asdas"
                                            title="asdasd"
                                            price={1260}
                                            image={CardImg}
                                        />
                                    </div>
                                    <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'>
                                        <Card
                                            link="#"
                                            type="asdas"
                                            title="asdasd"
                                            price={1260}
                                            image={CardImg}
                                        />
                                    </div>
                                </div> :
                                <div className='grid grid-cols-12 gap-[30px]'>
                                    <div className='col-span-12'>
                                        <CardLg
                                            link="#"
                                            type="asdas"
                                            title="asdasd"
                                            price={1260}
                                            image={CardImg}
                                            availability='In stock'
                                            desc="asdasdasdsdsa"
                                        />
                                    </div>
                                </div>
                        } */}

                        <Pagination />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryDetail

CategoryDetail.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};
