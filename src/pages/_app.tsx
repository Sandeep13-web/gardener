import "@/styles/globals.scss";
import { NextPage } from "next";
import type { AppProps } from "next/app";

import { Inter } from "next/font/google";
import { ReactElement, ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <div className={inter.className}>
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}
