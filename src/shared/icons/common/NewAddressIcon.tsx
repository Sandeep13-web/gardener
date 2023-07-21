import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<SVGSVGElement> { }

const NewAddressIcon: React.FC<Props> = ({ ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="81"
      viewBox="0 0 80 81"
      fill="none"
    >
      <g clipPath="url(#clip0_514_1794)">
        <path
          d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z"
          fill="#EBEDF3"
        />
        <path
          d="M33.435 25.4099C29.3422 25.4096 25.4168 27.035 22.5223 29.9286C19.6277 32.8223 18.0011 36.7471 18 40.8399V61.8899H60.744V25.4099H33.435Z"
          fill="#75B527"
        />
        <path
          d="M60.744 25.4099C56.6511 25.4096 52.7258 27.035 49.8312 29.9286C46.9367 32.8223 45.31 36.7471 45.309 40.8399V61.8899H76.177V40.8399C76.1762 36.7473 74.5498 32.8226 71.6557 29.929C68.7615 27.0354 64.8365 25.4099 60.744 25.4099Z"
          fill="#292F23"
        />
        <path
          d="M43.3519 61.8909H39.3719V80.0909H43.3519V61.8909Z"
          fill="#333333"
        />
        <path
          d="M55.1071 62.0351C55.0117 62.0348 54.9203 61.9968 54.8528 61.9293C54.7854 61.8619 54.7473 61.7705 54.7471 61.6751V51.4201C54.7471 51.3727 54.7565 51.3257 54.7746 51.282C54.7928 51.2382 54.8195 51.1985 54.8531 51.1651C54.9131 51.1051 61.4591 46.6911 62.5651 45.9451C62.6116 45.9137 62.6665 45.897 62.7226 45.897C62.7787 45.897 62.8335 45.9137 62.8801 45.9451C63.9801 46.6891 70.4651 51.0781 70.5131 51.1051C70.5691 51.1362 70.6157 51.1817 70.6482 51.2369C70.6808 51.2921 70.698 51.355 70.6981 51.4191V61.6751C70.6978 61.7705 70.6598 61.8619 70.5923 61.9293C70.5249 61.9968 70.4335 62.0348 70.3381 62.0351H55.1071Z"
          fill="#75B527"
        />
        <path
          d="M55.1071 61.83C55.0868 61.83 55.0667 61.826 55.048 61.8182C55.0292 61.8104 55.0122 61.799 54.9979 61.7846C54.9836 61.7702 54.9722 61.7531 54.9646 61.7343C54.9569 61.7155 54.953 61.6953 54.9531 61.675V51.551C54.9533 51.5231 54.961 51.4957 54.9754 51.4717C54.9898 51.4478 55.0105 51.4282 55.0351 51.415L62.7231 56.515L70.4111 51.415C70.4358 51.4282 70.4564 51.4478 70.4709 51.4717C70.4853 51.4957 70.493 51.5231 70.4931 51.551V61.671C70.4933 61.6914 70.4893 61.7116 70.4816 61.7305C70.4739 61.7494 70.4624 61.7665 70.448 61.7809C70.4336 61.7954 70.4165 61.8068 70.3976 61.8145C70.3787 61.8222 70.3585 61.8262 70.3381 61.826L55.1071 61.83Z"
          fill="white"
        />
        <path
          d="M70.667 61.798L63.667 55.853L63.524 55.953L70.5571 61.929L70.667 61.798Z"
          fill="#75B527"
        />
        <path
          d="M54.7771 61.798L61.7771 55.853L61.9201 55.953L54.8871 61.929L54.7771 61.798Z"
          fill="#75B527"
        />
        <path
          d="M62.7221 56.2771L69.7351 51.6251V51.0891C69.7352 51.0521 69.7281 51.0155 69.714 50.9813C69.6999 50.9471 69.6793 50.916 69.6532 50.8898C69.6271 50.8636 69.596 50.8428 69.5619 50.8286C69.5277 50.8144 69.4911 50.8071 69.4541 50.8071H55.9901C55.9531 50.8071 55.9165 50.8144 55.8823 50.8286C55.8482 50.8428 55.8172 50.8636 55.7911 50.8898C55.765 50.916 55.7443 50.9471 55.7302 50.9813C55.7161 51.0155 55.709 51.0521 55.7091 51.0891V51.6251L62.7221 56.2771Z"
          fill="white"
        />
        <path
          d="M58.7201 53.396L59.5361 53.937H65.9081L66.7241 53.396H58.7201Z"
          fill="#75B527"
        />
        <path
          d="M64.4811 54.8811H60.9591L61.7751 55.4221H63.6691L64.4811 54.8811Z"
          fill="#75B527"
        />
        <path
          d="M67.648 51.9121H57.796V52.4531H67.648V51.9121Z"
          fill="#75B527"
        />
      </g>
    </svg>
  );
};

export default NewAddressIcon;
