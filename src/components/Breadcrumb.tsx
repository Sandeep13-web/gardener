import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import {  BreadCrumbImage } from '@/shared/lib/image-config'
import { PiCaretRightBold } from 'react-icons/pi';

const Breadcrumb = () => {
  const router = useRouter();
  const { pathname } = router;

  // Define the breadcrumb items and their respective paths
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Login", path: "/login" },
    { label: "Offer", path: "/offer" },
    { label: "Blogs", path: "/blogs" },
  ];

  // Find the current breadcrumb item based on the current route
  const currentBreadcrumbItem = breadcrumbItems.find(
    (item) => item.path === pathname
  );

  if (!currentBreadcrumbItem) {
    return null; // No breadcrumb for the current route
  }

  // Render the breadcrumb with dynamic text
  return (
    <nav className="text-center py-10 bg-center bg-cover bg-no-repeat"style={{ backgroundImage: `url(${BreadCrumbImage})` }}>
      <div className="breadcrumb-content">
        <h1  className="breadcrumb-heading text-black font-semibold text-3xl leading-none capitalize mb-6">{currentBreadcrumbItem.label}</h1>
        <ul  className="breadcrumb-links flex justify-center">
          <li>
            <Link href="/" className="inline-block relative text-black leading-5 text-base">
               Home
            </Link>
            </li>
            <li className="items-center mx-1.5">
            <PiCaretRightBold />
            </li>
         
          <li >{currentBreadcrumbItem.label}</li>  {/* Display dynamic text for "Offer" */}
        </ul>
      </div>
    </nav>
  );
};

export default Breadcrumb;
