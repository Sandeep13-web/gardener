import React from 'react'
import { Props } from './category-card.props'
import Link from 'next/link'
import Image from 'next/image'

const CategoryCard: React.FC<Props> = ({title , totalProducts, shopLink , image}) => {
  return (
    <div className='relative category-card'>
        <Link className='absolute w-full h-full z-[1]' href={shopLink} />
        <div>
            <Image src={image} className="w-full h-auto transition-all" alt="Category Image" width={100} height={40} />
        </div>
        <div className='absolute left-[40px] top-[50%] transform translate-y-[-50%] flex flex-col gap-[10px] z-[9]'>
            <h2 className='category-card-title'>{title}</h2>
            <p className='text-xs text-[#999] uppercase'>{totalProducts} Products</p>
            <Link href={shopLink} className='text-[#253237] transition-all delay-100 text-sm hover:text-[#07a04b] hover:ml-[10px]'>Shop Now</Link>
        </div>
    </div>
  )
}

export default CategoryCard