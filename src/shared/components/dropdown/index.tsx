import React from "react";
import { DropdownProps } from "./dropdown.props";

const Dropdown: React.FC<DropdownProps> = ({
  children,
  type,
  disabled = false,
  className,
  toggleClassName,
  listClassName,
  size = "md",
  icon,
  iconPosition = "left",
  outline = false,
  loading = false,
  dropdownIcon = true,
  data,
}) => {
  return (
    <div className={`dropdown ${className}`}>
      <label
        tabIndex={0}
        // className={`btn btn-${size} btn-${type} m-1 whitespace-nowrap text-[#555] text-sm font-medium flex gap-1 justify-center items-center ${toggleClassName}`}
        className={`btn-${size} m-1 whitespace-nowrap text-[#555] text-sm font-medium flex gap-1 justify-center items-center`}
      >
        {iconPosition === "left" ? icon : ""}
        {children}
        {iconPosition === "right" ? icon : ""}
        {dropdownIcon ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
              fill="#555555"
            ></path>
          </svg>
        ) : (
          ""
        )}
      </label>
      <ul
        tabIndex={0}
        className={`dropdown-content menu p-2 shadow bg-base-100 rounded-sm w-52 ${listClassName}`}
      >
        {data?.map((item, index) => (
          <li key={index}>
            <a>{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
