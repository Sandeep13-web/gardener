import { IAppCategories } from '@/interface/home.interface'
import { IProduct } from '@/interface/product.interface'
import Image from 'next/image'
import React from 'react'


export interface IProps {
    updatedData: any
}
const HalfLeftCard = ({ updatedData }: IProps) => {
    console.log(updatedData)
    return (
        <div className='relative'>
            {/* {
                updatedData?.map((product: IProduct, index: number) => (
                    <div className='p-4 border-gray-350'>
                        {product?.categoryTitle}
                        { }
                    </div>
                ))
            } */}
        </div>
    )
}

export default HalfLeftCard