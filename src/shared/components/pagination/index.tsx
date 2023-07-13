import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export interface IPagination {
    currentPage: number;
    pageChange: (arg0: number) => void;
    totalPages: number,
}

const Pagination: React.FC<IPagination> = ({ pageChange, currentPage, totalPages }) => {
    return (
        <div className='pagination_content'>
            <button className={currentPage === 1 ? 'disabled' : ''}
                disabled={currentPage === 1}
                onClick={() => pageChange(currentPage - 1)}
            >
                <FaChevronLeft />
            </button>
            <div className='flex items-center gap-[5px]'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={currentPage === index + 1 ? 'active' : ''}
                        onClick={() => pageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <button
                className={currentPage === totalPages ? 'disabled' : ''}
                disabled={currentPage === totalPages}
                onClick={() => pageChange(currentPage + 1)}
            >
                <FaChevronRight />
            </button>
        </div>
    )
}

export default Pagination