
import { store } from '@store/index';
import '@styles/style.scss';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';



import { customTheme } from '@shared/theme';
import { ConfigProvider, theme as antdtheme } from 'antd';
import { ThemeProvider, useTheme } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import { createContext, useEffect } from 'react';
import { Provider } from 'react-redux';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export const ThemeContext = createContext<any>(undefined);

function App({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { theme, setTheme } = useTheme();

  console.log("theme", theme)

  useEffect(() => {
    setTheme('light')
  }, [])


  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Provider store={store}>
        <ConfigProvider
          theme={{
            algorithm: theme === 'dark' ? antdtheme.darkAlgorithm : antdtheme.defaultAlgorithm,
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
      </Provider>
    </ThemeProvider>
  );
}

export default App;
