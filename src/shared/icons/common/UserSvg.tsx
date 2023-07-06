import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<SVGSVGElement> {}

const Usersvg: React.FC<Props> = ({ ...rest }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="15px"
      height="15px"
      viewBox="0 0 992.000000 1280.000000"
      preserveAspectRatio="xMidYMid meet"
      className="fill-black group-hover:fill-primary"
    >
      <g
        transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
       
        stroke="none"
      >
        <path
          d="M4710 12789 c-617 -58 -1183 -319 -1624 -749 -241 -235 -406 -460
-546 -745 -207 -422 -290 -805 -277 -1280 8 -291 46 -510 132 -770 291 -874
1011 -1543 1902 -1769 736 -187 1528 -51 2156 368 167 112 267 194 422 350
511 513 786 1179 785 1901 -1 439 -86 805 -280 1201 -350 712 -1015 1245
-1785 1428 -282 68 -607 92 -885 65z"
        />
        <path
          d="M4665 7139 c-343 -27 -672 -94 -1000 -204 -1048 -350 -1992 -1142
-2653 -2227 -597 -980 -936 -2114 -1002 -3353 -16 -298 -13 -422 9 -472 157
-344 1245 -646 2856 -792 717 -65 1214 -86 2085 -85 665 0 891 5 1405 34 701
40 1413 119 1970 220 900 163 1457 385 1566 623 22 50 25 174 9 472 -75 1399
-505 2682 -1246 3722 -947 1327 -2308 2083 -3728 2072 -94 -1 -216 -5 -271
-10z"
        />
      </g>
    </svg>
  );
};

export default Usersvg;
