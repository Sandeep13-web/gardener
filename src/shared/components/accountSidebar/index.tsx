import Link from "next/link";
import { useRouter } from "next/router";
import { FaShoppingBag, FaSignOutAlt, FaTrashAlt, FaUserAlt } from "react-icons/fa";

const AccountSidebar = () => {
  const {pathname} = useRouter()
  const listItemClass = `group text-gray-400 relative p-4 flex gap-2 items-center border-b border-gray-350 border-solid text-[14px]`;
  const linkClass = "absolute top-0 left-0 w-full h-full";
  const iconClass = "group-hover:text-primary-focus";
  const linkUrls = [
    { href: `/account/profile`, icon: <FaUserAlt className={iconClass} />, text: "ACCOUNT DETAILS" },
    { href: `/account/order`, icon: <FaShoppingBag className={iconClass} />, text: "ORDER HISTORY" },
    { href: `/account/change-password`, icon: <FaShoppingBag className={iconClass} />, text: "CHANGE PASSWORD" },
    { href: `/account/addresses`, icon: <FaShoppingBag className={iconClass} />, text: "MY ADDRESS" },
    { href: `/account/change-password`, icon: <FaSignOutAlt className={iconClass} />, text: "LOGOUT" },
    { href: `/account/change-password`, icon: <FaTrashAlt className={iconClass} />, text: "DELETE ACCOUNT" },
  ];

  return (
    <div className="py-6">
      <ul className="[&>:active]:text-primary">
        <li className="pb-4 border-b border-solid border-gray-350">
          <div className="relative rounded-full overflow-hidden w-[100px] mx-auto">
            <Link href={``} className={linkClass}></Link>
            <img
              src="https://api.uat.ordering-merokishan.ekbana.net/storage/uploads/config/image-config/avatar-image/6422a939ac2db.png"
              alt=""
              className="object-cover w-full"
            />
          </div>
        </li>
        {linkUrls.map((link, index) => (
          <li key={index} className={`${listItemClass} ${pathname===link.href && 'text-primary'}`}>
            <Link href={link.href} className={linkClass}></Link>
            {link.icon}
            <span className={iconClass}>{link.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountSidebar;