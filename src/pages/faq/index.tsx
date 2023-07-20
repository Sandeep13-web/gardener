import React, { useEffect, useState } from 'react'
import { NextPageWithLayout } from '../_app'
import MainLayout from '@/shared/main-layout'
import Head from 'next/head'
import Loader from '@/components/Loading'
import Breadcrumb from '@/shared/components/breadcrumb'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { getPageData } from '@/services/page.service'

const Faq: NextPageWithLayout = () => {
    const router = useRouter();
    const { asPath } = router;
    const [descriptionContent, setDescriptionContent] = useState<string>("");
    const path = asPath.split("/");
    const slug = path[path.length - 1];
    const { data: faqData, isInitialLoading: fetchLoading } = useQuery({
        queryKey: ["getPageData", slug],
        queryFn: async () => {
            if (slug) {
                const response = await getPageData(slug);
                return response;
            }
        },
        enabled: !!slug,
    });

    useEffect(() => {
        if (faqData) {
            setDescriptionContent(faqData?.data?.description || "");
        }
    }, [faqData]);

    return (
        <>
            <Head>
                <title>Faq</title>
            </Head>
            {/* {
                fetchLoading ? (
                    <Loader />
                ) : ( */}
            <>
                <Breadcrumb title={faqData?.data?.title} />
                {/* <div
                    className="py-8 main-wrapper-block"
                    dangerouslySetInnerHTML={{ __html: descriptionContent }}
                /> */}

                <div className="container">
                    <div className='py-[60px]'>
                        <h5 className='text-[32px] text-slate-850 capitalize font-semibold mb-7 text-center'>Frequently Asked Questions</h5>
                        <div className="mb-3.5 collapse bg-base-200 faq-accordion">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title">
                                Do you refund the money if I cancel my order?
                            </div>
                            <div className="collapse-content">
                                <p className='text-sm'>Normally, we ask our customers to make payment only when they receive the products or when they get the final call from the delivery team. However, in situations where you have already paid, canceled the order and the delivery has not taken place, we refund. Also in situations where due to circumstance if we can’t deliver the product on the promised time, and you have already made the payment, we cancel the order ourselves and consider refunding.</p>
                            </div>
                        </div>
                        <div className="mb-3.5 collapse bg-base-200 faq-accordion">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title">
                                How can I place an order via your website?
                            </div>
                            <div className="collapse-content">
                                <p className='text-sm'>Firstly, you need to register. Sign up by adding your email address, phone number, and then set up a password. Once you do that, you are logged into the website. Choose from varieties of plants and add to the cart and then proceed for the order placement.</p>
                            </div>
                        </div>
                        <div className="mb-3.5 collapse bg-base-200 faq-accordion">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title">
                                Where is your nursery located?
                            </div>
                            <div className="collapse-content">
                                <p className='text-sm'>Currently, we have four outlets. We are located at Mandikhatar, Chakrapath, Labim Mall, and Kalanki Bhatbhateni. Our Mandikhatar outlet is also the Production House where all the imports happen and where our plants get nurtured.</p>
                            </div>
                        </div>
                        <div className="mb-3.5 collapse bg-base-200 faq-accordion">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title">
                                How can I make the payment?
                            </div>
                            <div className="collapse-content">
                                <p className='text-sm'>We provide few payment options like Payment on Delivery such as (Cash on Delivery, Fonepay, and Card), Bank Transfer, and Payment Gateways like (Esewa and Khalti).</p>
                            </div>
                        </div>
                        <div className="mb-3.5 collapse bg-base-200 faq-accordion">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title">
                                What is the minimum price for placing an order?
                            </div>
                            <div className="collapse-content">
                                <p className='text-sm'>The minimum order for placing an order is Rs.500. This is applicable for all order placements via the website, app, and even our Facebook/Instagram pages.</p>
                            </div>
                        </div>
                        <div className="mb-3.5 collapse bg-base-200 faq-accordion">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title">
                                Do I get discounts if purchased in a bulk/great quantity?
                            </div>
                            <div className="collapse-content">
                                <p className='text-sm'>We love our customers and seeing them happy makes us happy. If you have made a massive purchase, we may offer you some good discounts.</p>
                            </div>
                        </div>
                        <div className="mb-3.5 collapse bg-base-200 faq-accordion">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title">
                                Do I get discounts if I order via your app/website?
                            </div>
                            <div className="collapse-content">
                                <p className='text-sm'>Not really, but we do provide discount codes often. You can use the coupon code for discounts whenever available.</p>
                            </div>
                        </div>
                        <div className="mb-3.5 collapse bg-base-200 faq-accordion">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title">
                                How can I place an order via your app?
                            </div>
                            <div className="collapse-content">
                                <p className='text-sm'>If you have already signed up earlier, just log in to the app with the email address and password you have set up. If you are signing up for the first time, add your email address, phone number, and then set up a password. Once you do that, you are logged in to the app. Choose from varieties of plants, add to the cart and then proceed for the order placement.</p>
                            </div>
                        </div>
                        <div className="mb-3.5 collapse bg-base-200 faq-accordion">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title">
                                Can I exchange my plants?
                            </div>
                            <div className="collapse-content">
                                <p className='text-sm'>Usually, this situation might not occur, as our team sends the pictures of the plants beforehand for confirmation with our customers. We have always been delivering plants in their good condition. However, in cases like if plants happen to be in bad condition after the delivery, for example: if the plants die the day after the delivery, we might exchange them looking at how severe the condition is. Or, we bring them to the Production House to revive the plant in our Plant ICU center. But preferably, we guide our customers to further recover the plants by giving them care tips ideas.</p>
                            </div>
                        </div>
                        <div className="mb-3.5 collapse bg-base-200 faq-accordion">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title">
                                Can I cancel my order if I change my mind?
                            </div>
                            <div className="collapse-content">
                                <p className='text-sm'>Yes, you can cancel your order anytime but it will be easier if you inform us before the delivery time. You can cancel the order when you receive the final call from the delivery team or just let us know by messaging us on our Facebook/Instagram pages.</p>
                            </div>
                        </div>
                        <div className="mb-3.5 collapse bg-base-200 faq-accordion">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title">
                                Once the order is placed, how long does it take to deliver?
                            </div>
                            <div className="collapse-content">
                                <p className='text-sm'>Depending on the availability of plants and the schedule of our delivery team, the delivery may take up to 2-3 days.</p>
                            </div>
                        </div>
                        <div className="mb-3.5 collapse bg-base-200 faq-accordion">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title">
                                Do I get discounts if I refer your page to someone?
                            </div>
                            <div className="collapse-content">
                                <p className='text-sm'>Currently, we don’t have this offer but we may consider doing this in the future.</p>
                            </div>
                        </div>
                        <div className="mb-3.5 collapse bg-base-200 faq-accordion">
                            <input type="radio" name="my-accordion-1" />
                            <div className="collapse-title">
                                What is the delivery charge?
                            </div>
                            <div className="collapse-content">
                                <p className='text-sm'>Delivery Charge is Rs.150 inside and outside Ring road.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default Faq

Faq.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>
}