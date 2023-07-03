import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getPageData } from "@/services/page.service";
import Breadcrumb from "@/components/Breadcrumb";

const GiftAPlant: NextPageWithLayout = () => {
  const router = useRouter();
  const { asPath } = router;
  const [descriptionContent, setDescriptionContent] = useState<string>('');
  const path = asPath.split('/');
  const slug = path[path.length - 1];
  const { data: giftPlantData } = useQuery({
    queryKey: ["getPageData", slug],
    queryFn: async () => {
      if (slug) {
        const response = await getPageData(slug);
        console.log(response);
        return response;
      }
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (giftPlantData) {
      setDescriptionContent(giftPlantData?.data?.description || '');
     }
  }, [giftPlantData]);
  return (
    <>
    <Breadcrumb title={giftPlantData?.data?.title} />
    <div className="py-7 text-justify" dangerouslySetInnerHTML={{ __html:descriptionContent, }} />
    </>
  );
  
}
export default GiftAPlant;
GiftAPlant.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
