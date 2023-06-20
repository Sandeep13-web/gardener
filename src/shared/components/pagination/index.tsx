import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Pagination = () => {
    return (
        <div className='pagination_content'>
            <button className='disabled' disabled><FaChevronLeft /></button>
            <div className='flex items-center gap-[5px]'>
                <button className='active'>1</button>
                <button>2</button>
            </div>
            <button><FaChevronRight /></button>
        </div>
    )
}

export default Pagination