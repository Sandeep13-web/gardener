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
import ReactSlider from 'react-slider';
import { getConfig } from '@/services/home.service';
import { ITag } from '@/interface/tag.interface';
import { getTagList } from '@/services/tag.service';
import Loader from '@/components/Loading';
import CategorySidebar from '@/shared/components/categorySidebar';
import TagSidebar from '@/shared/components/tagSidebar';
import Breadcrumb from '@/shared/components/breadcrumb';
import SortingDropdown from '@/shared/components/sorting-dropdown';
import SkeletonLoadingCard from '@/shared/components/skeleton/products';
import { ICartItem } from '@/interface/cart.interface';
import Head from 'next/head';
import { getToken } from '@/shared/utils/cookies-utils/cookies.utils';


const CategoryDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const { slug } = router.query
    const token = getToken()
    const [grid, setGrid] = useState<boolean>(true)
    const [query, setQuery] = useState<string>('');
    const queryClient = useQueryClient();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [setFiltered, setSetFiltered] = useState(false);
    const [productData, setProductData] = useState(null);
    const [selectedValue, setSelectedValue] = useState<string>('')
    const { data: categories, isInitialLoading: loading }: any = useQuery({ queryKey: ['getCategories'] });
    const { data: cart } = useQuery<ICartItem>(["getCart"]);
    const { data: tags } = useQuery({
        queryKey: ["getTagList"],
        queryFn: getTagList,
    });
    const { data: config, isInitialLoading } = useQuery({
        queryKey: ["getConfig"],
        queryFn: getConfig,
    });
    //For favourite map
    const { data: favList }: any = useQuery<any>(["wishlistProducts", token], { enabled: !!token });

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
    const handleSortingChange = (value: string) => {
        setSelectedValue(value)
    }

    const { data: initialProductData, isLoading, error } = useQuery(
        ['getProductByCategoryId', slug, pageNumber, selectedValue],
        async () => {
            let response;
            if (setFiltered) {
                response = await getProductByCategory(query, pageNumber, slug, value[0], value[1], selectedValue);
            } else {
                response = await getProductByCategory(query, pageNumber, slug, '', '', selectedValue);
            }
            return response;
        },
    );
    const updatedData = initialProductData?.data?.map((item: any) => ({
        ...item,
        // product: {
        //     ...item.product,
        // }
        isFav: favList && favList?.data?.length > 0 ? favList?.data?.some((favItem: any) => favItem?.product_id === item?.id) : false,
        favId: favList && favList.data.length > 0 ? favList?.data.find((favItem: any) => favItem.product_id === item?.id)?.id : 0
    }));

    const handlePageChange = (value: number) => {
        setPageNumber(value)
    }


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

    useEffect(() => {
        handlePageChange(1)
    }, [slug])

    return (
        <>
            <Head>
                <title>{initialProductData?.data[0]?.categoryTitle || 'I am the Gardener'}</title>
            </Head>
            <Breadcrumb title={initialProductData?.data[0]?.categoryTitle} />
            <div className='container my-[60px]'>
                <div className="grid grid-cols-12 md:gap-[30px]">
                    <div className='order-last col-span-12 md:order-first md:col-span-3 right-sidebar'>
                        <div className='mb-[20px]'>
                            <h3 className='right-sidebar-head'>
                                Filter By
                            </h3>
                            <div>
                                <h4 className='text-slate-850 font-semibold font-base mb-3.5'>Categories</h4>
                                <CategorySidebar />
                                {/* <ul className='pl-4'>
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
                                </ul> */}
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
                                                <div {...props} className="focus:outline-none absolute top-[-5px] h-[15px] w-[15px] rounded-full bg-primary" style={{ ...props.style, }}>
                                                    {/* <div className="focus:outline-none relative top-[-180px] text-white rounded-full text-[12px]">{state.valueNow}</div> */}
                                                    <p className='font-normal absolute top-[-20px] text-[14px]'>{config?.data?.currency}{state.valueNow}</p>
                                                </div>
                                            )}
                                            renderTrack={(props, state) => <div {...props} style={{
                                                ...props.style, height: '5px', backgroundColor:
                                                    state.index === 0 ? '#f0f0f0' : state.index === 2 ? '#f0f0f0' : '#07a04b'
                                            }} />}
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
                            <TagSidebar />
                        </div>
                    </div>
                    <div className='col-span-12 md:col-span-9'>
                        <div className='flex flex-col sm:flex-row px-[30px] py-[10px] mb-[30px] bg-slate-150'>
                            <div className='flex-1 flex items-center mb-4 sm:mb-0 gap-[15px]'>
                                <p className='text-gray-750 text-sm leading-[20px]'>There Are {initialProductData?.data.length} Products.</p>
                            </div>
                            <div className='flex items-center gap-[10px]'>
                                <p className='text-gray-750 text-sm leading-[20px] p-2'>Sort By:</p>
                                <SortingDropdown sortChange={handleSortingChange} />
                            </div>
                        </div>
                        <div>
                            {
                                isLoading ?
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                                        {[1, 2, 3, 4].map((index) => (
                                            <SkeletonLoadingCard
                                                key={`app-skeleton-${index}`}
                                            />
                                        ))}
                                    </div> :
                                    initialProductData.data?.length === 0 ? (
                                        <EmptyPage />
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 xxs:grid-cols-2 lg:grid-cols-4">
                                                {updatedData?.map((product: any, index: any) => (
                                                    <Card
                                                        product={product}
                                                        key={`app-cat-products-${index}`}
                                                        cartItem={cart?.cartProducts.find((item) => item?.product?.id === product?.id)}
                                                    />
                                                ))}
                                            </div>
                                            <Pagination
                                                totalPages={initialProductData?.meta?.pagination?.total_pages}
                                                currentPage={initialProductData?.meta?.pagination?.current_page}
                                                pageChange={handlePageChange}
                                            />
                                        </>
                                    )
                            }
                        </div>

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
