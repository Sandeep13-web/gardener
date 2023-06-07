
import { store } from '@store/index';
import '@styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';



import { customTheme } from '@shared/theme';
import { getCookie, setCookie } from 'cookies-next';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import { createContext, useEffect, useState } from 'react';
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
  const localTheme = getCookie('isDarkMode');

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    setCookie('isDarkMode', !isDarkMode);
  };

  useEffect(() => {
    if (localTheme) {
      setIsDarkMode(true)
    } else {
      setCookie('isDarkMode', false);
    }
  }, [localTheme])


  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Provider store={store}>

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
      </Provider>
    </ThemeProvider>
  );
}

export default App;
