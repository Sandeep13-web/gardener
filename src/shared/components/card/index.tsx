import React from 'react'
import { Props } from './card.props'
import Image from 'next/image'
import Link from 'next/link'

const Card: React.FC<Props> = ({ type, title, price, image, link }) => {
    return (
        <div className="card plant-card relative">
            <Link href={link} className="absolute top-0 bottom-0 left-0 right-0 z-[1]" />
            <figure>
                <Image src={image} alt="Plant" className='w-full h-auto' width={100} height={100}/>
            </figure>
            <div className="card-body px-[15px] py-[20px] gap-[10px]">
                <p className='text-xs text-[#999] uppercase'>{type}</p>
                <h2 className="card-title plant-card-title">{title}</h2>
                <p className='text-[#00ae4d] text-sm font-semibold'>NPR {price}</p>
                {/* <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div> */}
            </div>
        </div>
    )
}

export default Card