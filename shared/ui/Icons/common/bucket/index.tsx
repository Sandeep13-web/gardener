interface Props extends React.SVGProps<SVGSVGElement> {
  isActive?: boolean;
}
const BucketIcon: React.FC<Props> = ({ isActive, ...rest }) => {
  return (
    <svg
      {...rest}
      width="22"
      height="24"
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.500015 3.20703H21.5L19.1667 20.9062H19.1636C19.0446 22.5797 15.4351 23.9225 11 23.9225C6.56479 23.9225 2.95538 22.5797 2.83634 20.9062H2.83335L0.500015 3.20703Z"
        fill="#E5002B"
      />
      <ellipse
        cx="10.5"
        cy="3.10162"
        rx="10.5"
        ry="3.10162"
        transform="matrix(-1 0 0 1 21.5 0.0771484)"
        fill="#222222"
      />
      <ellipse
        cx="9.41869"
        cy="2.76016"
        rx="9.41869"
        ry="2.76016"
        transform="matrix(-1 0 0 1 20.4189 0.760254)"
        fill="white"
      />
      <mask
        id="mask0_1_1269"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="2"
        y="12"
        width="18"
        height="12"
      >
        <path
          d="M2.83367 20.8208C2.83367 22.5338 6.49001 23.9224 11.0003 23.9224C15.5107 23.9224 19.167 22.5338 19.167 20.8208C19.167 19.1078 14.4863 12.4834 9.97594 12.4834C5.46562 12.4834 2.83367 19.1078 2.83367 20.8208Z"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_1_1269)">
        <rect
          width="1.36585"
          height="8"
          transform="matrix(-1 0 0 1 14.2158 17)"
          fill="white"
        />
        <rect
          width="1.36585"
          height="8"
          transform="matrix(-1 0 0 1 11.7119 17)"
          fill="white"
        />
        <rect
          width="1.36585"
          height="8"
          transform="matrix(-1 0 0 1 9.20703 17)"
          fill="white"
        />
      </g>
    </svg>
  );
};

export default BucketIcon;
