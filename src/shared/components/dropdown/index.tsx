import React from "react";
import { DropdownProps } from "./dropdown.props";
import CaretDownIcon from "@/shared/icons/common/CaretDownIcon";

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
        className={`btn-${size} m-1 whitespace-nowrap text-[#555] text-sm font-medium flex gap-1 justify-center items-center ${toggleClassName}`}
      >
        {iconPosition === "left" ? icon : ""}
        {children}
        {iconPosition === "right" ? icon : ""}
        {dropdownIcon ? <CaretDownIcon /> : ""}
      </label>
      <ul
        tabIndex={0}
        className={`dropdown-content menu p-2 shadow bg-base-100 rounded-sm w-52 z-[60] ${listClassName}`}
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
