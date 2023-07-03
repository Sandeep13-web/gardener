import Link from 'next/link'
import React from 'react'
import { Props } from './authBanner.props'

const AuthBanner: React.FC<Props> = ({title, breadCrumb}) => {
    return (
        <>
            <div className='product-page-banner'>
                <div className="container">
                    <h2 className='text-slate-850 text-[30px] capitalize font-semibold'>{title}</h2>
                    <div className="text-base breadcrumbs">
                        <ul className='justify-center'>
                            <li>
                                <Link href="/" className='text-slate-850 transition-all delay-150 duration-300 hover:!no-underline hover:text-primary'>Home</Link>
                            </li>
                            <li className='text-slate-850'>{breadCrumb}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthBanner