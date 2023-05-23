import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
}

const CaretDownIcon: React.FC<Props> = ({ isActive, ...rest }) => {
  return (
    <svg
      {...rest}
      width="1em"
      height="1em"
      viewBox="0 0 16 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 1.5L9.14899 7.0118C8.51705 7.66273 7.48295 7.66273 6.85101 7.0118L1.5 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CaretDownIcon;
