import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import MainLayout from '@/shared/main-layout';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductsFromSlug, getRelatedProductsFromId } from '@/services/product.service';
import EmptyPage from '@/components/emptyPage';
import Card from '@/shared/components/card';
import Title from '@/shared/components/title';
import Breadcrumb from '@/shared/components/breadcrumb';
import Link from 'next/link';
import { ICartItem, ICreateCartItem, IUpdateCartItem } from '@/interface/cart.interface';
import { ICartProduct } from '@/interface/product.interface';
import { useCarts } from '@/hooks/cart.hooks';
import ButtonLoader from '@/shared/components/btn-loading';
import Head from 'next/head';
import { addToCart } from '@/services/cart.service';
import { TOAST_TYPES, showToast } from '@/shared/utils/toast-utils/toast.utils';


const ProductSlug = () => {
  const router = useRouter()
  const { slug } = router.query;
  const queryClient = useQueryClient();
  const [descriptionContent, setDescriptionContent] = useState<string>('');
  const [moreInfoContent, setMoreInfoContent] = useState<string>('');
  const [taxMessage, setTaxMessage] = useState<string>('');

  const [itemCartDetail, setItemCartDetail] = useState<ICartProduct>()
  const [value, setValue] = useState<number>(itemCartDetail?.quantity! | 1);
  const { updateCartMutation, updateCartLoading } = useCarts()

  const { data: cartData } = useQuery<ICartItem>(['getCart'])

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

  const { data: relatedProducts } = useQuery(
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

  useEffect(() => {
    cartData?.cartProducts?.map((item: any) => {
      if (slug === item?.product?.slug) {
        setItemCartDetail(item)
      }
    })
  }, [slug])
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
              <Image
                src={productData?.response?.data?.images[0]?.imageName}
                alt=""
                className="flex mx-auto img-fluid"
                width={330} height={330}
              />
            </div>
            <div className="col-span-12 md:col-span-7">
              <h2 className="mb-6 text-2xl font-semibold text-darkBlack">
                {productData?.response?.data?.title}
              </h2>
              <p className="flex items-center gap-3 mb-2 text-sm font-bold color-darkBlack">
                Category:
                <Link href={`/category/${productData?.response?.data?.categorySlug}`} className="mb-0 text-primary">
                  <span className="font-normal">{productData?.response?.data?.categoryTitle}</span>
                </Link>
              </p>
              <ul className="flex my-5">

                {!productData?.response?.data?.unitPrice[0]?.hasOffer && (
                  <li className="mr-1 text-base text-red-250">
                    NPR
                    <span>
                      {productData?.response?.data?.unitPrice[0]?.sellingPrice}
                    </span>
                  </li>
                )}

                {productData?.response?.data?.unitPrice[0]?.hasOffer && (
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
                    className="w-6 h-12 text-sm font-medium text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
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
                    className="w-6 h-12 text-sm font-medium text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
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
            </div>
          </div>
        </div>
      </section>

      <div className="mb-[60px]">
        <div className="container">
          <a data-toggle="tab" className="active relative flex justify-center uppercase pb-3 text-lg font-bold text-center after:h-[2px] after:absolute after:left-0 after:right-0 after:bottom-[-1px] after:bg-transparent after:transition-all after:duration-300 after:ease-linear after:bg-primary text-darkBlack after:w-[250px] after:text-center after:m-auto">
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
      {/* Related Products */}
      <section className="my-[60px]">
        <div className="container">
          <Title type="title-section" text="You Might Also Like" />
          {relatedProducts?.data.length === 0 ? (
            <EmptyPage />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {relatedProducts?.data.map((product: any, index: any) => (
                <Card
                  product={product}
                  key={`app-cat-products-${index}`}

                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ProductSlug;
ProductSlug.getLayout = (page: any) => {
  return <MainLayout>{page}</MainLayout>;
};

