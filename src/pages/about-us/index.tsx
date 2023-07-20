import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getPageData } from "@/services/page.service";
import Breadcrumb from "@/shared/components/breadcrumb";
import Loader from "@/components/Loading";

const AboutUs: NextPageWithLayout = () => {
  const router = useRouter();
  const { asPath } = router;
  const [descriptionContent, setDescriptionContent] = useState<string>('');
  const path = asPath.split('/');
  const slug = path[path.length - 1];
  const { data: aboutData, isInitialLoading: fetchLoading } = useQuery({
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
    if (aboutData) {
      setDescriptionContent(aboutData?.data?.description || '');
    }
  }, [aboutData]);
  return (
    <>
      {
        fetchLoading ? (
          <Loader />
        ) : (
          <>
            <Breadcrumb title={aboutData?.data?.title} />
            <div className="main-wrapper-block aboutus-wrapper" dangerouslySetInnerHTML={{ __html: descriptionContent, }} />
          </>
        )
      }
    </>
  );

}
export default AboutUs;
AboutUs.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
