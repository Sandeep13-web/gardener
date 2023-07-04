import React, { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getPageData } from "@/services/page.service";
import Breadcrumb from "@/components/Breadcrumb";

const TreeInstallation: NextPageWithLayout = () => {
  const router = useRouter();
  const { asPath } = router;
  const [descriptionContent, setDescriptionContent] = useState<string>('');
  const path = asPath.split('/');
  const slug = path[path.length - 1];
  const { data: treeInstallationData } = useQuery({
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
    if (treeInstallationData) {
      setDescriptionContent(treeInstallationData?.data?.description || '');
     }
  }, [treeInstallationData]);
  return (
    <>
    <Breadcrumb title={treeInstallationData?.data?.title} />
    <div className="main-wrapper-block"  dangerouslySetInnerHTML={{ __html:descriptionContent, }} />
    </>
  );
  
}
export default TreeInstallation;
TreeInstallation.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
