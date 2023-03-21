// import Loader from '@shared/components/spinner';
// import '@shared/layouts/main/main-layout.scss';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { customTheme } from '@shared/theme';
import { wrapper } from '@store/index';
import { ConfigProvider, theme } from 'antd';
import NextNProgress from 'nextjs-progressbar';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function App({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    // <Provider store={store}>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: customTheme.primaryColor,
        },
      }}
    >
      {getLayout(
        <>
          <NextNProgress
            color={customTheme.primaryColor}
            options={{ showSpinner: false }}
            showOnShallow
            height={5}
          />
          <Component {...pageProps} />
        </>
      )}
    </ConfigProvider>
    // </Provider>
  );
}

export default wrapper.withRedux(App);
