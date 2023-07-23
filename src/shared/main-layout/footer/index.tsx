import { getConfig } from "@/services/home.service";
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
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const { data: config }: any = useQuery(['getConfig'])

  return (
    <div className="relative">
      <Image fill src={FooterBg} className="z-0" alt="footer-bg" />
      <footer className="relative block p-4 !pb-0 sm:p-10 footer text-base-content">
        <div className="container flex flex-wrap items-start justify-between gap-2 footer">
          <div className="w-full xs:w-[45%] md:w-[23%] mb-3">
            <Image src={Logo} height={69} width={128} alt="footer-logo" priority />
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
              <Image src={QR} alt="QR" width={150} height={200}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>
          <div className="w-full xs:w-[45%] md:w-[23%] mb-3">
            <span className="footer-title">Company</span>
            <div className="flex items-center justify-start gap-4 mb-3">
              <FooterBullet />
              <Link href='/about-us' aria-label="about-us" className="p-0 footer-link">About Us</Link>
            </div>
            <div className="flex items-center justify-start gap-4 mb-3">
              <FooterBullet />
              <Link href='/privacy-policy' aria-label="privacy-policy-footter" className="p-0 footer-link">Privacy Policy</Link>
            </div>
            <div className="flex items-center justify-start gap-4 mb-3">
              <FooterBullet />
              <Link href='/faq' aria-label="faq-footer" className="p-0 footer-link">FAQs</Link>
            </div>
            <div className="flex items-center justify-start gap-4 mb-3">
              <FooterBullet />
              <Link href='/contact-us' aria-label="contact-us" className="p-0 footer-link">Contact Us</Link>
            </div>
            <div className="flex items-center justify-start gap-4 mb-3">
              <FooterBullet />
              <Link href='/terms-and-conditions' aria-label="terms-and-condition" className="p-0 footer-link">Terms and Conditions</Link>
            </div>
          </div>
          <div className="w-full xs:w-[45%] md:w-[23%] mb-3">
            <span className="footer-title">Buy Plants and Accessories</span>
            <div className="flex items-center justify-start gap-4 mb-3">
              <FooterBullet />
              <Link href='/plant-consultation' aria-label="plant-and-consultation" className="p-0 footer-link">
                Plants and Consultation
              </Link>
            </div>
            <div className="flex items-center justify-start gap-4 mb-3">
              <FooterBullet />
              <Link href='/tree-installation' aria-label="tree-installation" className="p-0 footer-link">Tree Installation</Link>
            </div>
          </div>
        </div>
        <div className="container flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex gap-3">
            <Link href='https://www.facebook.com/imthegardener/' aria-label="fb-link" target="_blank" className="w-auto p-0 btn btn-circle">
              <Image
                src={socials.facebook}
                height={36}
                width={36}
                alt="facebook"
              />
            </Link>
            <Link href='https://www.instagram.com/iamthegardener/' aria-label="insta-link" target="_blank" className="w-auto p-0 btn btn-circle">
              <Image
                src={socials.instagram}
                height={36}
                width={36}
                alt="insta"
              />
            </Link>
            <Link href='https://www.youtube.com/channel/UCYAdKv4kRybRdWjHU_tZcvQ' aria-label="youtube" target="_blank" className="w-auto p-0 btn btn-circle">
              <Image
                src={socials.youtube}
                height={36}
                width={36}
                alt="yt"
              />
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-base font-bold text-black me-4">
              DOWNLOAD THE APP ON
            </h3>
            <div className="flex gap-3">
              {config?.data?.pageData && <>
                <Link target="_blank" aria-label="app-store" href={config?.data?.pageData['section4 appstore link']} className="p-0 btn">
                  <Image src={AppStore} height={32} width={108} alt="app-store" />
                </Link>
                <Link aria-label="play-store" target="_blank" href={config?.data?.pageData['section4 googleplay link']} className="p-0 btn">
                  <Image
                    src={PlayStore}
                    height={32}
                    width={108}
                    alt="play-store"
                  />
                </Link>
              </>}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="flex flex-wrap items-center justify-between w-full gap-4 p-5 text-white sm:p-3 bg-primary rounded-t-2xl">
            <div className="flex flex-wrap justify-center gap-2 mx-auto">
              <p className="text-center">
                © 2022 I am the Gardener. All Rights Reserved
              </p>
              <div className="divider divider-horizontal before:bg-white before:w-[1px] after:w-[1px] after:bg-white m-0 hidden xs:flex"></div>
              <p>Powered By Ekbana</p>
            </div>
            <div className="flex flex-wrap justify-center mx-auto">
              <button className="relative w-10 h-10 p-0 bg-transparent border-0 sm:h-14 sm:w-14 btn">
                <Image src={Esewa}
                  height={56}
                  width={56}
                  alt="esewa" />
              </button>
              <div className="divider divider-horizontal before:bg-white before:w-[1px] after:w-[1px] after:bg-white m-0 my-3"></div>
              <button className="relative w-10 h-10 p-0 bg-transparent border-0 sm:h-14 sm:w-14 btn">
                <Image src={MasterCard}
                  height={56}
                  width={56}
                  alt="master-card" />
              </button>
              <div className="divider divider-horizontal before:bg-white before:w-[1px] after:w-[1px] after:bg-white m-0 my-3"></div>
              <button className="relative w-10 h-10 p-0 bg-transparent border-0 sm:h-14 sm:w-14 btn">
                <Image src={CashOnHand}
                  height={56}
                  width={56}
                  alt="cash on hand" />
              </button>
              <div className="divider divider-horizontal before:bg-white before:w-[1px] after:w-[1px] after:bg-white m-0 my-3"></div>
              <button className="relative w-10 h-10 p-0 bg-transparent border-0 sm:h-14 sm:w-14 btn">
                <Image src={UnionPay}
                  height={56}
                  width={56}
                  alt="union pay" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
