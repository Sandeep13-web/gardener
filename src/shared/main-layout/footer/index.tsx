import FooterBullet from "@/shared/icons/common/FooterBullet";
import {
  AppStore,
  CashOnHand,
  Esewa,
  FooterBg,
  Logo,
  MasterCard,
  PlayStore,
  QR,
  UnionPay,
  socials,
} from "@/shared/lib/image-config";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="relative">
      <Image fill src={FooterBg} className="z-0" alt="footer-bg" />
      <footer className="relative block p-4 !pb-0 sm:p-10 footer text-base-content">
        <div className="container flex flex-wrap items-start justify-between gap-2 footer">
          <div className="w-full xs:w-[45%] md:w-[23%] mb-3">
            <Image src={Logo} height={69} width={128} alt="footer-logo" />
            <p className="text-[12px]">
              A contemporary garden center to meet all of your plant needs.
              Whether you’re looking to purchase indoor plants, outdoor plants,
              flowerpots, or any other nursery equipment, we have got you
              covered!
            </p>
          </div>
          <div className="w-full xs:w-[45%] md:w-[23%] mb-3">
            <span className="footer-title">Services</span>
            <div className="flex items-start justify-start gap-4 mb-3">
              <FooterBullet className="mt-[0.2rem]" />
              <div>
                <p className="text-xs opacity-60">Call AnyTime</p>
                <button className="p-0 footer-link">9802069969</button>
              </div>
            </div>
            <div className="flex items-start justify-start gap-4 mb-3">
              <FooterBullet className="mt-[0.2rem]" />
              <div>
                <p className="text-xs opacity-60">Send Email</p>
                <button className="p-0 footer-link">
                  iamthegardener@gmail.com
                </button>
              </div>
            </div>
            <div className="flex items-start justify-start gap-4 mb-3">
              <FooterBullet className="mt-[0.2rem]" />
              <div>
                <p className="text-xs opacity-60">Visit Office</p>
                <button className="p-0 footer-link">
                  Akriti Marga, Maharajgunj
                </button>
              </div>
            </div>
            <div className="ps-4">
              <Image src={QR} alt="QR" width={150} height={200} />
            </div>
          </div>
          <div className="w-full xs:w-[45%] md:w-[23%] mb-3">
            <span className="footer-title">Company</span>
            <div className="flex items-center justify-start gap-4 mb-3">
              <FooterBullet />
              <button className="p-0 footer-link">About Us</button>
            </div>
            <div className="flex items-center justify-start gap-4 mb-3">
              <FooterBullet />
              <button className="p-0 footer-link">Privacy Policy</button>
            </div>
            <div className="flex items-center justify-start gap-4 mb-3">
              <FooterBullet />
              <button className="p-0 footer-link">FAQs</button>
            </div>
            <div className="flex items-center justify-start gap-4 mb-3">
              <FooterBullet />
              <button className="p-0 footer-link">Contact Us</button>
            </div>
            <div className="flex items-center justify-start gap-4 mb-3">
              <FooterBullet />
              <button className="p-0 footer-link">Terms and Conditions</button>
            </div>
          </div>
          <div className="w-full xs:w-[45%] md:w-[23%] mb-3">
            <span className="footer-title">Buy Plants and Accessories</span>
            <div className="flex items-center justify-start gap-4 mb-3">
              <FooterBullet />
              <button className="p-0 footer-link">
                Plants and Consultation
              </button>
            </div>
            <div className="flex items-center justify-start gap-4 mb-3">
              <FooterBullet />
              <button className="p-0 footer-link">Tree Installation</button>
            </div>
          </div>
        </div>
        <div className="container flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex gap-3">
            <button className="w-auto p-0 btn btn-circle">
              <Image
                src={socials.facebook}
                height={36}
                width={36}
                alt="facebook"
              />
            </button>
            <button className="w-auto p-0 btn btn-circle">
              <Image
                src={socials.instagram}
                height={36}
                width={36}
                alt="facebook"
              />
            </button>
            <button className="w-auto p-0 btn btn-circle">
              <Image
                src={socials.youtube}
                height={36}
                width={36}
                alt="facebook"
              />
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-base font-bold text-black me-4">
              DOWNLOAD THE APP ON
            </h3>
            <div className="flex gap-3">
              <button className="p-0 btn">
                <Image src={AppStore} height={32} width={108} alt="app-store" />
              </button>
              <button className="p-0 btn">
                <Image
                  src={PlayStore}
                  height={32}
                  width={108}
                  alt="play-store"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="flex flex-wrap items-center justify-between w-full gap-4 p-5 text-white bg-primary rounded-t-2xl">
            <div className="flex flex-wrap justify-center gap-2 mx-auto">
              <p className="text-center">
                © 2022 I am the Gardener. All Rights Reserved
              </p>
              <div className="divider divider-horizontal before:bg-white before:w-[1px] after:w-[1px] after:bg-white m-0"></div>
              <p>Powered By Ekbana</p>
            </div>
            <div className="flex flex-wrap justify-center mx-auto">
              <button className="relative w-12 h-12 p-0 bg-transparent border-0 sm:h-14 sm:w-14 btn">
                <Image src={Esewa} fill alt="esewa" />
              </button>
              <div className="divider divider-horizontal before:bg-white before:w-[1px] after:w-[1px] after:bg-white m-0 my-3"></div>
              <button className="relative w-12 h-12 p-0 bg-transparent border-0 sm:h-14 sm:w-14 btn">
                <Image src={MasterCard} fill alt="master-card" />
              </button>
              <div className="divider divider-horizontal before:bg-white before:w-[1px] after:w-[1px] after:bg-white m-0 my-3"></div>
              <button className="relative w-12 h-12 p-0 bg-transparent border-0 sm:h-14 sm:w-14 btn">
                <Image src={CashOnHand} fill alt="cash on hand" />
              </button>
              <div className="divider divider-horizontal before:bg-white before:w-[1px] after:w-[1px] after:bg-white m-0 my-3"></div>
              <button className="relative w-12 h-12 p-0 bg-transparent border-0 sm:h-14 sm:w-14 btn">
                <Image src={UnionPay} fill alt="union pay" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
