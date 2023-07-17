
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
import Breadcrumb from "@/shared/components/breadcrumb";

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
            <div className="order-last col-span-12 md:order-first md:col-span-3 right-sidebar">
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
                            className="block mb-3 text-2xl font-semibold truncate card-title hover:text-primary"
                        >
                            { blogDetails.title }
                        </Link>
                        <div className="flex items-center gap-2 mb-8">
                            <Link
                            href={``}
                            className="flex items-center gap-1 pr-2 text-sm border-r border-black border-solid group hover:text-primary "
                            >
                            <Usersvg className="text-black hover:fill-blue-500" />
                            { blogDetails.author }
                            </Link>
                            <Link
                            href={``}
                            className="flex items-center gap-1 text-sm group hover:text-primary"
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
