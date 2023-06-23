import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import {  BreadCrumbImage } from '@/shared/lib/image-config'
import { PiCaretRightBold } from 'react-icons/pi';

const Loader = () => {
  const router = useRouter();
  const { pathname } = router;


  // Render the breadcrumb with dynamic text
  return (
    <div className="flex items-center mx-auto justify-center h-[400px]">
       <div
  className="h-[50px] w-[50px] animate-spin rounded-full border-[6px] border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
  role="status">
</div>
    </div>
   
  );
};

export default Loader;
