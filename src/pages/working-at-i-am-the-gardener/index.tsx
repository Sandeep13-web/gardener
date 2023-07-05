import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getPageData } from "@/services/page.service";
import Breadcrumb from "@/components/Breadcrumb";

const Career: NextPageWithLayout = () => {
  const router = useRouter();
  const { asPath } = router;
  const [descriptionContent, setDescriptionContent] = useState<string>('');
  const path = asPath.split('/');
  const slug = path[path.length - 1];
  const { data: careerData } = useQuery({
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
    if (careerData) {
      setDescriptionContent(careerData?.data?.description || '');
     }
  }, [careerData]);
  return (
    <>
    <Breadcrumb title={careerData?.data?.title} />
    <div className="main-wrapper-block"  dangerouslySetInnerHTML={{ __html:descriptionContent, }} />
    </>
  );
  
}
export default Career;
Career.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
