import React, { useState } from 'react'
import { Props } from './card.props'
import Image from 'next/image'
import Link from 'next/link'
import SearchIcon from '@/shared/icons/common/SearchIcon'
import TrashIcon from '@/shared/icons/common/TrashIcon'

const Card: React.FC<Props> = ({ type, title, price, image, link }) => {

    const [value, setValue] = useState<number>(1)
    const [addItem, setAddItem] = useState<boolean>(false)

    const addItemNum = (value: number) => {
        const addedItem = value + 1
        setValue(addedItem)
    }
    const subItemNum = (value: number) => {
        if (value === 1) {
            setAddItem(false)
        } else {
            const subItem = value - 1
            setValue(subItem)
        }
    }
    return (
        <div className="card plant-card relative">
            <Link href={link} className="absolute top-0 bottom-0 left-0 right-0 z-[1]" />
            <figure>
                <Image src={image} alt="Plant" className='w-full h-auto' width={100} height={0} />
            </figure>
            <div className='plant-card_preview-icon'>
                <Link href={link} className='flex items-center justify-center'>
                    <SearchIcon className='max-w-[15px] h-auto' />
                </Link>
            </div>
            <div className="card-body px-[15px] py-[20px] gap-[10px]">
                <p className='text-xs text-gray-450 uppercase'>{type}</p>
                <h2 className="card-title plant-card-title">{title}</h2>
                <p className='text-primary text-sm font-semibold'>NPR {price}</p>

                <div className="flex justify-end relative z-[3]">
                    {
                        !addItem &&
                        <button
                            className="btn btn-primary btn-outline p-2 h-auto !min-h-0 text-xs leading-auto"
                            onClick={() => setAddItem(true)}
                        >Add to Cart</button>
                    }
                    {
                        addItem &&
                        <div className='border border-primary flex items-center gap-3 rounded rounded-lg px-3'>
                            <button className='text-primary py-1 text-sm w-[14px]'
                                onClick={() => subItemNum(value)}
                            >
                                {
                                    value === 1 ?
                                        <TrashIcon className='max-w-[14px] h-auto' />
                                        : '-'
                                }
                            </button>
                            <input type="text" className='text-center max-w-[35px] h-full font-bold text-sm border-0 focus:outline-0 text-primary' value={value} readOnly maxLength={3} />
                            <button className='text-primary py-1 w-[14px]'
                                onClick={() => addItemNum(value)}
                            >+</button>
                        </div>
                    }
                </div>
            </div>
            {/* <div className='plant-card_cartBtn'>
                <Link href={'/'} className='text-slate-850 bg-white uppercase font-bold underline underline-offset-4 hover:textprimary'>Add to Cart</Link>
            </div> */}
        </div>
    )
}

export default Card