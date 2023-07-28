import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import MainLayout from '@/shared/main-layout';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductsFromSlug, getRelatedProductsFromId } from '@/services/product.service';
import Card from '@/shared/components/card';
import Title from '@/shared/components/title';
import Breadcrumb from '@/shared/components/breadcrumb';
import Link from 'next/link';
import { ICartItem, ICreateCartItem, IUpdateCartItem } from '@/interface/cart.interface';
import { ICartProduct } from '@/interface/product.interface';
import { useCarts } from '@/hooks/cart.hooks';
import ButtonLoader from '@/shared/components/btn-loading';
import Head from 'next/head';
import { addToCart, getCartData } from '@/services/cart.service';
import { TOAST_TYPES, showToast } from '@/shared/utils/toast-utils/toast.utils';
import SkeletonImage from '@/shared/components/skeleton/image';
import CardHeartIcon from '@/shared/icons/common/CardHeartIcon';
import { getToken } from '@/shared/utils/cookies-utils/cookies.utils';
import { useWishlists } from '@/hooks/wishlist.hooks';
import SkeletonDescription from '@/shared/components/skeleton/description';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SkeletonLoadingCard from '@/shared/components/skeleton/products';
import { ITag } from '@/interface/tag.interface';


const ProductSlug = () => {
  const router = useRouter()
  const { slug } = router.query;
  const token = getToken()
  const queryClient = useQueryClient();
  const [descriptionContent, setDescriptionContent] = useState<string>('');
  const [moreInfoContent, setMoreInfoContent] = useState<string>('');
  const [taxMessage, setTaxMessage] = useState<string>('');

  const [itemCartDetail, setItemCartDetail] = useState<ICartProduct>()
  const [value, setValue] = useState<number>(1);
  const { updateCartMutation, updateCartLoading } = useCarts()
  //For swiper
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  const { data: cartData } = useQuery<ICartItem>(['getCart'], () => getCartData({ coupon: '' }));

  const { data: productData, isLoading, error } = useQuery(
    ['getProductsFromSlug', slug],
    async () => {
      if (slug) {
        const response = await getProductsFromSlug(slug);
        const productId = response?.data?.id;
        return { response, productId };
      }
    }
  );
  const stock: any = productData?.response?.data?.unitPrice[0]?.stock

  const { data: relatedProducts, isLoading: relatedProductsLoading } = useQuery(
    ['getRelatedProductsFromId', productData?.productId],
    async () => {
      if (productData?.productId) {
        const response = await getRelatedProductsFromId(productData?.productId);
        return response;
      }
    }
  );

  const handleAddToCart = () => {
    const payload: ICreateCartItem = {
      note: '',
      productId: productData?.productId,
      priceId: productData?.response?.data?.unitPrice[0]?.id,
      quantity: value,
    }
    mutation.mutate(payload)
  };

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, 'Item Added To Cart Successfully');
      queryClient.invalidateQueries(['getCart'])
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error?.response?.data?.errors[0]?.message)
    }
  })

  //updateCart function
  const updateCartHandler = () => {
    if (value <= stock) {
      const payload: IUpdateCartItem = {
        note: '',
        quantity: value,
        product_number: itemCartDetail?.id || productData?.productId
      }
      updateCartMutation.mutate(payload)
    }
  }

  const { addFavMutation, removeFavMutation, addLoading, removeLoading } = useWishlists() //for adding products for wishlist ->hook
  //getFavlist items
  const { data: favList }: any = useQuery<any>(["wishlistProducts", token], { enabled: !!token });

  /*
   ** Add product in favourite list
  */
  const addToFav = (id: number) => {
    addFavMutation.mutate(id)
  }

  /*
 ** Remove product from favourite list
*/
  const removeFromFav = (id: number) => {
    removeFavMutation.mutate(id)
  }

  /**
   * to check if the product is in fav list or not
   */
  const isFavGen = () => {
    if (favList && favList?.data?.length > 0) {
      const isfavResult = favList?.data?.some((favItem: any) => (
        (favItem?.product_id === productData?.productId))
      );
      return isfavResult;
    }
  }

  /**
   * To generate the fav id in order to implement remove from fav
   */
  const genFavId = () => {
    if (favList && favList?.data?.length > 0) {
      const favId = favList?.data.find((favItem: any) => (
        favItem.product_id === productData?.productId));
      return favId?.id || 0;
    }

  }
  const favId = genFavId() //setting generated fav id.


  //handling prev and next of swiper category
  const handlePrevious = useCallback(() => {
    if (swiperRef) {
      swiperRef?.slidePrev();
    }
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    if (swiperRef) {
      swiperRef?.slideNext();
    }
  }, [swiperRef]);


  useEffect(() => {
    if (cartData) {
      cartData?.cartProducts?.map((item: any) => {
        if (slug === item?.product?.slug) {
          setItemCartDetail(item)
          setValue(item?.quantity)
        }
      })
    }
  }, [slug, cartData])

  useEffect(() => {
    if (productData) {
      setDescriptionContent(productData?.response?.data?.description || '');
      setMoreInfoContent(productData?.response?.data?.moreInfo || '');
      const message = productData?.response?.data?.taxable ? 'Including Tax' : 'Excluding Tax';
      setTaxMessage(message);
    }
  }, [productData]);


  return (
    <>
      <Head>
        <title>{productData?.response?.data?.title}</title>
      </Head>
      <Breadcrumb title={productData?.response?.data?.title} />
      <section className="my-[60px]">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-5">
              {
                isLoading ?
                  <SkeletonImage />
                  : (
                    <>
                      <div className="w-full carousel">
                        {
                          productData?.response?.data?.images?.map((img: any, index: number) => (
                            <div key={index} id={`item-${index}`} className="w-full carousel-item">
                              <Image
                                alt='Product Image'
                                src={img?.imageName}
                                width={330} height={330}
                              />
                            </div>
                          ))
                        }
                      </div>
                      <div className="flex justify-start w-full gap-2 py-2">
                        {
                          productData?.response?.data?.images?.map((img: any, index: number) => (
                            <a href={`#item-${index}`} key={index}>
                              <Image
                                alt='Product Image'
                                src={img?.imageName}
                                width={90} height={90}
                              />
                            </a>
                          ))
                        }
                      </div>
                    </>
                  )
              }

            </div>
            <div className="col-span-12 md:col-span-7">
              {
                isLoading ? (
                  <SkeletonDescription />
                ) : (
                  <>
                    <h2 className="mb-6 text-2xl font-semibold text-slate-850">
                      {productData?.response?.data?.title}
                    </h2>
                    <p className="flex items-center gap-3 mb-2 text-sm font-bold color-slate-850">
                      Category:
                      <Link href={`/category/${productData?.response?.data?.categorySlug}`} aria-label="category-title" className="mb-0 text-primary">
                        <span className="font-normal">{productData?.response?.data?.categoryTitle}</span>
                      </Link>
                    </p>
                    <p className="flex items-center gap-3 mb-2 text-sm font-bold color-slate-850">
                      Tags:
                      {productData?.response?.data?.tags.map((prev: ITag, index: number) => (
                        <Link href={`/tag?id=${prev?.slug}`} aria-label="tag-title" className="mb-0 text-primary" key={`tag-${index}`}>
                          <span className="font-normal">{prev?.title}</span>
                        </Link>
                      ))}
                    </p>
                    <ul className="flex my-5">

                      {productData?.response?.data?.unitPrice[0]?.hasOffer ? (
                        <>
                          <li className="mr-1 text-base text-red-250">
                            NPR
                            <span>
                              {productData?.response?.data?.unitPrice[0]?.newPrice}
                            </span>
                          </li>

                          <li className="mr-1 text-base font-semibold line-through text-primary">
                            NPR
                            <span>
                              {productData?.response?.data?.unitPrice[0]?.oldPrice}
                            </span>
                          </li>
                        </>
                      ) : (
                        <li className="mr-1 text-base text-red-250">
                          NPR
                          <span>
                            {productData?.response?.data?.unitPrice[0]?.sellingPrice}
                          </span>
                        </li>
                      )}
                      <li className="text-base font-semibold text-primary ">
                        ( <span dangerouslySetInnerHTML={{ __html: taxMessage }} />)
                      </li>
                    </ul>

                    <p dangerouslySetInnerHTML={{ __html: descriptionContent, }} />

                    <div className="w-100 flex my-[30px]">
                      <div className="h-[48px] flex items-center border border-solid border-gray-950 overflow-hidden relative text-gray-250">
                        <button
                          onClick={() => { setValue(value - 1) }}
                          disabled={value === 1 ? true : false}
                          className="w-6 h-12 text-sm font-medium text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none">
                          -
                        </button>
                        <input
                          type="text"
                          name="qtybutton"
                          className="flex-grow w-[30px] text-sm text-center h-[48px] focus-visible:border-none focus-visible:outline focus:outline-none"
                          readOnly
                          value={value}
                        />
                        <button
                          onClick={() => { setValue(value + 1) }}
                          disabled={value === stock ? true : false}
                          className="w-6 h-12 text-sm font-medium text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none">
                          +
                        </button>
                      </div>
                      <div>
                        {
                          itemCartDetail ?
                            <button
                              type='button'
                              onClick={updateCartHandler}
                              disabled={updateCartLoading}
                              className={`${updateCartLoading && 'opacity-70 '} disabled:cursor-not-allowed flex items-center gap-4 relative px-[55px] font-bold uppercase rounded-[30px] bg-accent text-base-100 ml-2.5 h-[48px] text-sm hover:bg-orange-250 hover:text-base-100`}>

                              + Update To Cart
                              {
                                updateCartLoading &&
                                <ButtonLoader />
                              }
                            </button>
                            :
                            <button
                              type='button'
                              onClick={handleAddToCart}
                              disabled={mutation.isLoading}
                              className={`${mutation.isLoading && 'opacity-70 '} disabled:cursor-not-allowed flex items-center gap-4 relative px-[55px] font-bold uppercase rounded-[30px] bg-accent text-base-100 ml-2.5 h-[48px] text-sm hover:bg-orange-250 hover:text-base-100`}>

                              + Add To Cart
                              {
                                mutation.isLoading &&
                                <ButtonLoader />
                              }
                            </button>
                        }
                      </div>
                    </div>
                    {
                      token && (
                        isFavGen() ?
                          <button onClick={() => removeFromFav(favId)} className='flex items-center gap-3'>
                            {
                              removeLoading ? (
                                <ButtonLoader className='!border-primary' />
                              ) : (
                                <>
                                  <CardHeartIcon className="stroke-[#E5002B] fill-[#E5002B]" />
                                  Remove from wishlist
                                </>
                              )
                            }
                          </button> :
                          <button onClick={() => addToFav(productData?.productId)} className='flex items-center gap-3'>
                            {
                              addLoading ? (
                                <ButtonLoader className='!border-primary' />
                              ) : (
                                <>
                                  <CardHeartIcon />
                                  Add to wishlist
                                </>
                              )
                            }
                          </button>
                      )
                    }
                  </>
                )
              }

            </div>
          </div>
        </div >
      </section >

      {
        moreInfoContent !== '' &&
        <div className="mb-[60px]">
          <div className="container">
            <a data-toggle="tab" className="active relative flex justify-center uppercase pb-3 text-lg font-bold text-center after:h-[2px] after:absolute after:left-0 after:right-0 after:bottom-[-1px] after:bg-transparent after:transition-all after:duration-300 after:ease-linear after:bg-primary text-slate-850 after:w-[250px] after:text-center after:m-auto">
              Product Description
            </a>
            <div className="px-8 py-10 overflow-hidden text-base leading-6 text-left bg-white border border-gray-200 tab-content">
              <div id="productDetail" className="tab-pane active">
                <div className="product-anotherinfo-wrapper">
                  <div className="text-justify description__text">
                    <p dangerouslySetInnerHTML={{ __html: moreInfoContent, }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {/* Related Products */}
      {
        relatedProducts?.data.length !== 0 &&
        <section className="my-[60px]">
          <div className="container">
            <div className='flex items-center justify-between'>
              <Title type="title-section" text="You Might Also Like" />
              {
                relatedProducts?.data.length > 5 && (
                  <div className='!static productSwiper-navigation mb-[45px]'>
                    <button
                      // disabled={swiperRef?.isBeginning}
                      onClick={handlePrevious}>
                      <FaChevronLeft />
                    </button>
                    <button
                      // disabled={swiperRef?.isEnd}
                      onClick={handleNext}>
                      <FaChevronRight />
                    </button>
                  </div>
                )
              }
            </div>
            {
              relatedProductsLoading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <SkeletonLoadingCard
                      key={`app-skeleton-${index}`}
                    />
                  ))}
                </div>
              ) : (
                <Swiper
                  slidesPerView={5}
                  grid={{
                    rows: 1,
                    fill: "row",
                  }}
                  pagination={false}
                  spaceBetween={20}
                  modules={[Grid]}
                  className="productSwiper"
                  onSwiper={setSwiperRef}
                >
                  {relatedProducts?.data.map((product: any, index: any) => (
                    <SwiperSlide key={`related-producys-${index}`}>
                      <Card
                        product={product}
                        key={`app-cat-products-${index}`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )
            }

          </div>
        </section >
      }
    </>
  );
}

export default ProductSlug;
ProductSlug.getLayout = (page: any) => {
  return <MainLayout>{page}</MainLayout>;
};

