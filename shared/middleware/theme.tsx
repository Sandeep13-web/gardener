

import { ConfigProvider, theme as antdtheme } from 'antd';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
const CustomTheme = (props: any) => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme('light')
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antdtheme.darkAlgorithm : antdtheme.defaultAlgorithm,
      }}
    >
      {props.children}
    </ConfigProvider>
  )
}

export default CustomTheme