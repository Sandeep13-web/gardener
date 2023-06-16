import React from 'react'
import { Props } from './category-card.props'
import Link from 'next/link'
import Image from 'next/image'
import SearchIcon from '@/shared/icons/common/SearchIcon'
import CaretDownIcon from '@/shared/icons/common/CaretDownIcon'

const CategoryCard: React.FC<Props> = ({title , totalProducts, shopLink , image}) => {
  return (
    <div className='relative category-card'>
        <Link className='absolute w-full h-full z-[1]' href={shopLink} />
        <div>
            <Image src={image} className="w-full h-auto transition-all delay-200 duration-300" alt="Category Image" width={100} height={40} />
        </div>
        <div className='absolute left-[40px] top-[50%] transform translate-y-[-50%] flex flex-col gap-[10px] z-[9]'>
            <h2 className='category-card-title'>{title}</h2>
            <p className='text-xs text-[#999] uppercase font-normal'>{totalProducts} Products</p>
            <Link href={shopLink} className='text-[#253237] transition-all delay-100 text-sm hover:text-[#07a04b] hover:ml-[10px] flex items-center font-normal'>
              Shop Now
              <span className='bg-[#07a04b] rounded rounded-full flex items-center justify-center w-[12px] h-[12px] p-[2px]'>
                <CaretDownIcon className='transform rotate-[270deg] text-white max-w-full h-auto' />
              </span>
            </Link>
        </div>
    </div>
  )
}

export default CategoryCard