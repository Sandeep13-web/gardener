import { NextPageWithLayout } from '@/pages/_app';
import MainLayout from '@/shared/main-layout';
import Link from 'next/link';
import React from 'react'

const CategoryDetail: NextPageWithLayout = () => {
    return (
        <>
            <div className='w-full h-[150px] py-[40px] text-center'>
                <div className="container">
                    <h2 className='text-slate-850 text-[30px] mb-[15px] capitalize font-semibold'>Plant With Pot</h2>
                    <div className="text-sm breadcrumbs">
                        <ul className='justify-center'>
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li><Link href={'#'}>Documents</Link></li>
                            <li>Add Document</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='container mt-6'>
                123
            </div>
        </>
    )
}

export default CategoryDetail

CategoryDetail.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};
