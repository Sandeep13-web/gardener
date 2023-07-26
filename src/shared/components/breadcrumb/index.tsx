import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import { BreadCrumbImage } from "@/shared/lib/image-config";
import { PiCaretRightBold } from "react-icons/pi";

const Breadcrumb = ({ title }: any) => {
  const router = useRouter();
  const { pathname } = router;
  const { slug } = router.query;
  const { id } = router.query;

  // Define the breadcrumb items and their respective paths
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Login", path: "/login" },
    { label: "Sign Up", path: "/register" },
    { label: "Forgot Password", path: "/forgot-password" },
    { label: "Reset Password", path: "/reset-password" },
    { label: "Offer", path: "/offer" },
    { label: "Blogs", path: "/blogs" },
    { label: "Products", path: "/products" },
    { label: "Categories", path: "/categories" },
    { label: "Search", path: "/search" },
    { label: "About Us", path: "/about-us" },
    { label: "Wishlist", path: "/wishlist" },
    { label: "Blogs", path: "/blogs" },
    { label: "Account Profile", path: '/account/profile' },
    { label: "Order", path: '/account/order' },
    { label: 'Change Password', path: "/account/change-password" },
    { label: "Your Address", path: '/account/addresses' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms and Conditions', path: '/terms-and-conditions' },
    { label: 'Faq', path: '/faq' },
    { label: 'Contact Us', path: '/contact-us' },
  ];
  const currentBreadcrumbItem = breadcrumbItems.find(
    (item) => item.path === pathname
  );

  let breadcrumbLabel = "";

  if (currentBreadcrumbItem && !slug) {
    breadcrumbLabel = currentBreadcrumbItem.label;
  } else if (slug || id) {
    breadcrumbLabel = title;
  } else {
    return null; // No breadcrumb for the current route
  }

  // Render the breadcrumb with dynamic text
  return (
    <nav
      className="py-10 text-center bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${BreadCrumbImage})` }}
    >
      <div className="breadcrumb-content">
        <h1 className="mb-6 text-3xl font-semibold leading-none text-black capitalize breadcrumb-heading">
          {breadcrumbLabel}
        </h1>
        <ul className="flex items-center justify-center breadcrumb-links">
          <li>
            <Link
              href="/"
              className="relative inline-block text-base leading-5 text-black transition-all duration-200 delay-100 hover:text-primary"
            >
              Home
            </Link>
          </li>
          <li className="items-center mx-1.5">
            <PiCaretRightBold />
          </li>
          <li>{breadcrumbLabel}</li> {/* Display dynamic text for "Offer" */}
        </ul>
      </div>
    </nav>
  );
};

export default Breadcrumb;
