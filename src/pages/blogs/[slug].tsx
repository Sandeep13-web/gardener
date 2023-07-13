import Breadcrumb from "@/components/Breadcrumb";
import Loader from "@/components/Loading";
import EmptyPage from "@/components/emptyPage";
import { NextPageWithLayout } from "@/pages/_app";
import { getBlogDetailsFromSlug } from "@/services/blog.service";
import BlogSidebar from "@/shared/components/blogsSidebar";
import CalendarIcon from "@/shared/icons/common/CalendarIcon";
import Usersvg from "@/shared/icons/common/UserSvg";
import { banner } from "@/shared/lib/image-config";
import MainLayout from "@/shared/main-layout";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { parseISO, format } from "date-fns";

const BlogDetails: NextPageWithLayout = () => {
    const router = useRouter();
    const { slug } = router.query;

    const changeDateFormat = (dateString: string) => {
        const date = parseISO(dateString);
        return <span>{ format(date, 'd LLLL yyyy') }</span>
    }

    const { data: blogDetails, isLoading, error } = useQuery(
        ['getBlogDetails', slug], async () => {
            if (slug) {
                const response = await getBlogDetailsFromSlug(slug);
                return response.data;
            } else {
                return Promise.resolve(null);
            }
        }
    )

    return (
        <div>
        <Breadcrumb title={slug} />
        <div className="container  my-[60px]">
            <div className="grid grid-cols-12 md:gap-[30px]">
            <div className="order-last md:order-first col-span-12 md:col-span-3 right-sidebar">
                <BlogSidebar />
            </div>
            {
                isLoading && <Loader />
            }
            {
                blogDetails ? (
                    <div className="col-span-12 md:col-span-9">
                        <div className="mb-8">
                        <Image
                            src={ blogDetails.backgroundImage }
                            width={2000}
                            height={2000}
                            alt="banner image"
                            className="w-full"
                        />
                        </div>
                        <div>
                        <p className="mb-3">{ blogDetails.subTitle }</p>
                        <Link
                            href={``}
                            className="block card-title mb-3 font-semibold text-2xl truncate hover:text-primary"
                        >
                            { blogDetails.title }
                        </Link>
                        <div className="flex gap-2 items-center mb-8">
                            <Link
                            href={``}
                            className="group flex gap-1 items-center pr-2 border-r border-solid border-black text-sm hover:text-primary "
                            >
                            <Usersvg className="text-black hover:fill-blue-500" />
                            { blogDetails.author }
                            </Link>
                            <Link
                            href={``}
                            className="group flex gap-1 items-center text-sm hover:text-primary"
                            >
                            <CalendarIcon className="text-black hover:fill-blue-500" />
                            { changeDateFormat(blogDetails.created_date.date) }
                            </Link>
                        </div>
                        <div className="blog-content">
                            <p
                                dangerouslySetInnerHTML={{ __html: blogDetails.description }}
                            >
                            </p>
                        </div>
                        </div>
                    </div>
                ) : (
                    <EmptyPage />
                )
            }
            </div>
        </div>
        </div>
    );
};

export default BlogDetails;

BlogDetails.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
