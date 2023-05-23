import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
}

const OfferIcon: React.FC<Props> = ({ isActive, ...rest }) => {
  return (
    <svg
      {...rest}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.98797 13.654L1.4657 12.1317C0.844767 11.5108 0.844767 10.4892 1.4657 9.8683L2.98797 8.346C3.24836 8.08561 3.45868 7.57484 3.45868 7.2143V5.06105C3.45868 4.17973 4.17976 3.45867 5.06109 3.45867H7.21431C7.57485 3.45867 8.08562 3.24839 8.34601 2.988L9.86828 1.4657C10.4892 0.844767 11.5108 0.844767 12.1317 1.4657L13.654 2.988C13.9144 3.24839 14.4251 3.45867 14.7857 3.45867H16.9389C17.8202 3.45867 18.5413 4.17973 18.5413 5.06105V7.2143C18.5413 7.57484 18.7516 8.08561 19.012 8.346L20.5343 9.8683C21.1552 10.4892 21.1552 11.5108 20.5343 12.1317L19.012 13.654C18.7516 13.9144 18.5413 14.4252 18.5413 14.7857V16.9388C18.5413 17.8201 17.8202 18.5413 16.9389 18.5413H14.7857C14.4251 18.5413 13.9144 18.7516 13.654 19.012L12.1317 20.5343C11.5108 21.1552 10.4892 21.1552 9.86828 20.5343L8.34601 19.012C8.08562 18.7516 7.57485 18.5413 7.21431 18.5413H5.06109C4.17976 18.5413 3.45868 17.8201 3.45868 16.9388V14.7857C3.45868 14.4151 3.24836 13.9044 2.98797 13.654Z"
        stroke="#FF8910"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 13.5L13.5 8.5"
        stroke="#FF8910"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0791 13.0832H13.0866"
        stroke="#FF8910"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.91209 8.91667H8.91957"
        stroke="#FF8910"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default OfferIcon;
