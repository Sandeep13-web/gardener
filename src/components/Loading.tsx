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
    <p>Loading...</p>
  );
};

export default Loader;
