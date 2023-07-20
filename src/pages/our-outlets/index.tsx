import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getPageData } from "@/services/page.service";
import Breadcrumb from "@/shared/components/breadcrumb";
import Loader from "@/components/Loading";

const OurOutlets: NextPageWithLayout = () => {
  const router = useRouter();
  const { asPath } = router;
  const [descriptionContent, setDescriptionContent] = useState<string>('');
  const path = asPath.split('/');
  const slug = path[path.length - 1];
  const { data: valuesData, isInitialLoading: fetchLoading } = useQuery({
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
    if (valuesData) {
      setDescriptionContent(valuesData?.data?.description || '');
    }
  }, [valuesData]);
  return (
    <>
      {
        fetchLoading ? (
          <Loader />
        ) : (
          <>
            <Breadcrumb title={valuesData?.data?.title} />
            <div className="main-wrapper-block" dangerouslySetInnerHTML={{ __html: descriptionContent, }} />
          </>
        )
      }

    </>
  );
}
export default OurOutlets;
OurOutlets.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
