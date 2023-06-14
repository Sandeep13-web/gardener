import React from 'react'
import { Props } from './title.props'

const Title: React.FC<Props> = ({ type, text, className, subTitle }) => {

    const getType = () => {
        if (type === 'title-content')
            return (
                <h2 className={className ? `${className}` : 'py-[30px] text-[#3a3a3a] text-3xl font-medium text-center relative w-full'}>
                    {text}
                </h2>
            );
        if (type === 'title-section')
            return (
                <div>
                    <h3 className={className ? `${className}` : 'text-[#253237] text-2xl capitalize font-semibold mb-[15px]'}>
                        {text}
                    </h3>
                    {
                        subTitle &&
                        <p className={className ? `${className}` : 'text-[#888] text-sm leading-[18px] mt-[10px]'}>
                            {subTitle}
                        </p>
                    }
                </div>
            );
        // if (type === 'title-sub') 
        //     return (

        //     );
        return (
            <h2 className={className ? `${className}` : 'text-[#3a3a3a] text-2xl text-center relative'}>
                {text}
            </h2>
        );
    };
    return (
        <div className={`flex justify-between items-center ${type == 'title-section' ? 'mb-[30px]' : ''}`}>
            {
                getType()
            }
        </div>
    )
}

export default Title