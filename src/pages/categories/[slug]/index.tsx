import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import { FaListUl } from 'react-icons/fa';
import Slider from 'react-slider'
import 'react-range-slider-input/dist/style.css';
import { NextPageWithLayout } from '@/pages/_app';
import MainLayout from '@/shared/main-layout';
import Card from '@/shared/components/card';
import Pagination from '@/shared/components/pagination';
import { CardImg } from '@/shared/lib/image-config'
import CardLg from '@/shared/components/card-lg';
import { useState } from 'react';
import { getProductByCategory } from '@/services/product.service';
import EmptyPage from '@/components/emptyPage';
import Breadcrumb from '@/components/Breadcrumb';
import ReactSlider from 'react-slider';
import { getConfig } from '@/services/home.service';
import { ITag } from '@/interface/tag.interface';
import { getTagList } from '@/services/tag.service';
import Loader from '@/components/Loading';


const CategoryDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const { slug } = router.query
    const [grid, setGrid] = useState<boolean>(true)
    const [query, setQuery] = useState<string>('');
    const queryClient = useQueryClient();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [setFiltered, setSetFiltered] = useState(false);
    const [productData, setProductData] = useState(null);
    const { data: categories, isInitialLoading: loading }: any = useQuery({ queryKey: ['getCategories'] });
    const { data: tags } = useQuery({
        queryKey: ["getTagList"],
        queryFn: getTagList,
      });
    const { data: config, isInitialLoading } = useQuery({
        queryKey: ["getConfig"],
        queryFn: getConfig,
      });
    const minimumPrice = Number(config?.data?.minimumPrice);
    const maximumPrice = Number(config?.data?.pageData['max-price']);
    const isMinimumValid = !isNaN(minimumPrice) && isFinite(minimumPrice);
    const isMaximumValid = !isNaN(maximumPrice) && isFinite(maximumPrice);
    const initialValue = [
        isMinimumValid ? minimumPrice : 0,
        isMaximumValid ? maximumPrice : 3000
      ];
    const [value, setValue] = useState(initialValue);  

    // Filter button clicked

    const handleFilterButtonClick = async () => {
    setSetFiltered(true); // Toggle the value of setFiltered
    };

    // Handle categories link click
    const handleCategoriesClick = () => {
        setValue(initialValue); // Reset value to initial values
      };

    //Fetch Category Data

    const { data: initialProductData, isLoading, error } = useQuery(
        ['getProductByCategoryId', slug, '', ''],
        async () => {
        let response;
        if (setFiltered) {
            response = await getProductByCategory(query, pageNumber, slug, value[0], value[1]);
        } else {
            response = await getProductByCategory(query, pageNumber, slug, '', '');
        }
        return response;
        },
    );

    useEffect(() => {
        if (initialProductData) {
        setProductData(initialProductData);
        }
    }, [initialProductData]);
  
    // Reset productData when setFiltered changes
    useEffect(() => {
        if (!setFiltered) {
        setProductData(initialProductData);
        }
    }, [setFiltered, initialProductData]);

    
      if (isLoading) {
        // Show loader while data is being fetched
        return <Loader />;
      }
      
      if (!productData) {
        return null; // or render a placeholder if productData is still undefined
      }


    return (
        <>
          <Breadcrumb  title={initialProductData?.data[0]?.categoryTitle}/>
            <div className='container my-[60px]'>
                <div className="grid grid-cols-12 md:gap-[30px]">
                    <div className='order-last md:order-first col-span-12 md:col-span-3 right-sidebar'>
                        <div className='mb-[20px]'>
                            <h3 className='right-sidebar-head'>
                                Filter By
                            </h3>
                            <div>
                                <h4 className='text-slate-850 font-semibold font-base mb-3.5'>Categories</h4>
                                <ul className='pl-4'>
                                    {
                                        categories?.data?.map((item: any, index: number) => (
                                            <li key={`categories-${index}`} className='pb-2'>
                                                <Link href={`/categories/${item?.slug}`}
                                                    className={`block text-gray-550 font-semibold text-[15px] leading-[22px] transition-all delay-100 duration-300 hover:text-primary pb-2 capitalize ${item?.slug == slug && 'text-primary'}`}
                                                    onClick={handleCategoriesClick}
                                                >
                                                    {item?.title}
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className='mt-3.5'>
                                <h4 className='text-slate-850 font-semibold font-base mb-[40px]'>Price</h4>
                                <div>
                                   <div className="mb-2">
                                   <ReactSlider
                                        className="horizontal-slider"
                                        thumbClassName="example-thumb"
                                        trackClassName="example-track"
                                        value={value}
                                        onChange={setValue}
                                        ariaLabel={['Lower thumb', 'Upper thumb']}
                                        ariaValuetext={state => `Thumb value ${state.valueNow}`}
                                        max={maximumPrice}
                                        min={minimumPrice}
                                        renderThumb={(props, state) => (
                                        <div {...props}  className="focus:outline-none absolute top-[-5px] h-[15px] w-[15px] rounded-full bg-primary" style={{...props.style, }}>
                                            {/* <div className="focus:outline-none relative top-[-180px] text-white rounded-full text-[12px]">{state.valueNow}</div> */}
                                            <p className='font-normal absolute top-[-20px] text-[14px]'>{config?.data?.currency}{state.valueNow}</p>
                                        </div>
                                        )}
                                        renderTrack={(props, state) => <div {...props} style={{...props.style, height: '5px', backgroundColor:
                                        state.index === 0 ? '#f0f0f0' : state.index === 2 ? '#f0f0f0' : '#07a04b' }} />}
                                        pearling
                                        minDistance={10}
                                    />
                                   </div>
                                
                                    <button className='btn btn-primary w-full font-bold px-[22px] py-[13px] rounded-[50px] text-white text-lg uppercase tracking-[1px] leading-[1] mt-[30px]' onClick={handleFilterButtonClick}>Filter</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className='right-sidebar-head'>
                                Tag
                            </h3>
                            <div className='flex flex-wrap'>
                                {
                                       tags?.data?.map((item: any, index: number) => (
                                            <div key={`categories-${index}`} className='mb-[20px]'>
                                                <Link href={{ pathname: '/tag',query: { id: item?.slug }}}
                                                    className={`border border-gray-350 px-[25px] py-[10px] rounded-[30px] bg-white capitalize m-1 text-gray-550 text-sm leading-[20px] transition-all delay-100 duration-300 hover:bg-primary hover:text-white hover:border-primary`}
                                                    onClick={handleCategoriesClick}
                                                >
                                                    {item?.title}
                                                </Link>
                                            </div>
                                        ))
                                    }
                                
                            </div>
                        </div>
                    </div>
                    <div className='col-span-12 md:col-span-9'>
                        <div className='flex flex-col sm:flex-row px-[30px] py-[10px] mb-[30px] bg-slate-150'>
                            <div className='flex-1 flex items-center mb-4 sm:mb-0 gap-[15px]'>
                                <div className="tabs gap-[15px]">
                                    <button
                                        className={`tab tab-active p-0 ${grid ? 'text-primary' : 'text-zinc-600' } hover:text-primary`}
                                        onClick={() => setGrid(true)}
                                    ><BsFillGrid3X3GapFill className='w-[18px] h-auto' /></button>  {/** Active status toggle remain */}
                                    <button
                                        className={`tab p-0 ${!grid ? 'text-primary' : 'text-zinc-600' } hover:text-primary`}
                                        onClick={() => setGrid(false)}
                                    ><FaListUl className='w-[18px] h-auto' /></button>
                                </div>
                                <p className='text-gray-750 text-sm leading-[20px] p-2'>There Are {initialProductData?.data.length} Products.</p>
                            </div>
                            <div className='flex items-center gap-[10px]'>
                                <p className='text-gray-750 text-sm leading-[20px] p-2'>Sort By:</p>
                                dropdown/select
                            </div>
                        </div>
                        {
                            grid ?
                            <div>
                            {initialProductData?.data.length === 0 ? (
                                <EmptyPage />
                             ) : (
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                      {initialProductData?.data.map((product: any, index: any) => (
                                        <Card
                                        product = {product}
                                        key={`app-cat-products-${index}`}
                                        />
                                      ))}
                                    </div>
                             )}
                          </div>:
                          
                                <div className='grid grid-cols-12 gap-[30px]'>
                                    <div className='col-span-12'>
                                        <CardLg
                                            link="#"
                                            type="asdas"
                                            title="asdasd"
                                            price={1260}
                                            image={CardImg}
                                            availability='In stock'
                                            desc="asdasdasdsdsa"
                                        />
                                    </div>
                                </div>
                        }

                        <Pagination />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryDetail

CategoryDetail.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};
