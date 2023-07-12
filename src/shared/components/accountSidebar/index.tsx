import Link from "next/link";
import React from "react";
import {
  FaShoppingBag,
  FaSignOutAlt,
  FaTrashAlt,
  FaUserAlt,
} from "react-icons/fa";

const AccountSidebar = () => {
  return (
    <div className="py-6">
      <ul className="[&>:active]:text-primary">
        <li className="border-b border-gray-350 border-solid pb-4">
          <div className="relative rounded-full overflow-hidden w-[100px] mx-auto ">
            <Link
              href={``}
              className="absolute w-full h-full left-0 top-0 "
            ></Link>
            <img
              src="https://api.uat.ordering-merokishan.ekbana.net/storage/uploads/config/image-config/avatar-image/6422a939ac2db.png"
              alt=""
              className=" object-cover w-full "
            />
          </div>
        </li>
        <li className=" group text-gray-400 relative p-4 flex gap-2 items-center border-b border-gray-350 border-solid  text-[14px]">
          <Link
            href={`/account/profile`}
            className="absolute w-full h-full left-0 top-0 "
          ></Link>
          <FaUserAlt className=" group-hover:text-primary-focus" />
          <span className=" group-hover:text-primary-focus">
            ACCOUNT DETAILS
          </span>
        </li>
        <li className=" group text-gray-400 relative p-4 flex gap-2 items-center border-b border-gray-350 border-solid  text-[14px]">
          <Link
            href={`/account/order`}
            className="absolute w-full h-full left-0 top-0 "
          ></Link>
          <FaShoppingBag className="group-hover:text-primary-focus" />
          <span className=" group-hover:text-primary-focus">ORDER HISTORY</span>
        </li>
        <li className=" group text-gray-400 relative p-4 flex gap-2 items-center border-b border-gray-350 border-solid  text-[14px]">
          <Link
            href={`/account/change-password`}
            className="absolute w-full h-full left-0 top-0 "
          ></Link>
          <FaShoppingBag className=" group-hover:text-primary-focus" />
          <span className=" group-hover:text-primary-focus">
            CHANGE PASSWORD
          </span>
        </li>
        <li className=" group text-gray-400 relative p-4 flex gap-2 items-center border-b border-gray-350 border-solid  text-[14px]">
          <Link
            href={`/account/addresses`}
            className="absolute w-full h-full left-0 top-0 "
          ></Link>
          <FaShoppingBag className=" group-hover:text-primary-focus" />
          <span className=" group-hover:text-primary-focus">MY ADDRESS</span>
        </li>
        <li className=" group text-gray-400 relative p-4 flex gap-2 items-center border-b border-gray-350 border-solid  text-[14px]">
          <Link
            href={`/account/change-password`}
            className="absolute w-full h-full left-0 top-0 "
          ></Link>
          <FaSignOutAlt className=" group-hover:text-primary-focus" />
          <span className=" group-hover:text-primary-focus">LOGOUT</span>
        </li>
        <li className=" group text-gray-400 relative p-4 flex gap-2 items-center  text-[14px]">
          <Link
            href={`/account/change-password`}
            className="absolute w-full h-full left-0 top-0 "
          ></Link>
          <FaTrashAlt className=" group-hover:text-primary-focus" />
          <span className=" group-hover:text-primary-focus">
            DELETE ACCOUNT
          </span>
        </li>
      </ul>
    </div>
  );
};

export default AccountSidebar;
