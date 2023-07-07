import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getPageData } from "@/services/page.service";
import Breadcrumb from "@/components/Breadcrumb";

const WhyPlant: NextPageWithLayout = () => {
  const router = useRouter();
  const { asPath } = router;
  const [descriptionContent, setDescriptionContent] = useState<string>('');
  const path = asPath.split('/');
  const slug = path[path.length - 1];
  const { data: whyPlantData } = useQuery({
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
    if (whyPlantData) {
      setDescriptionContent(whyPlantData?.data?.description || '');
     }
  }, [whyPlantData]);
  return (
    <>
    <Breadcrumb title={whyPlantData?.data?.title} />
    <div className="py-7 text-justify" dangerouslySetInnerHTML={{ __html:descriptionContent, }} />
    </>
  );
  
}
export default WhyPlant;
WhyPlant.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};