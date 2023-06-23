import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import Image from 'next/image';


const EmptyPage = () => {
  return (
    <div className="pt-0"> 
    <div className="container">
        <div>
          <Image
            src="/images/search-empty.svg"
            alt=""
            className="img-fluid mx-auto flex"
            width={330} height={330}
          />
         <div className="text-center">
            <h2 className="text-lg font-medium">No Products Found</h2>
            <p> Thank you for using I am the Gardener. We will be in contact with more details shortly.</p>
          </div>
          <div className="text-center">
            <Link href="/">
              Continue Shopping
             </Link> 
          </div>
        </div>
    </div>
  </div>
   
  );
};

export default EmptyPage;
