import { MenuOutlined } from '@ant-design/icons';
import {
  BucketIcon,
  CaretDownIcon,
  LocationPinIcon,
  LogoIcon,
  OfferIcon,
  ProfileIcon,
  SearchIcon,
} from '@shared/ui/Icons';
import {
  Button,
  ConfigProvider,
  Divider,
  Dropdown,
  Input,
  Layout,
  MenuProps,
  message,
  theme,
} from 'antd';
import Link from 'next/link';
import React from 'react';

const { useToken } = theme;

const { Header, Content, Footer } = Layout;

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: '1',
  },
  {
    label: 'Menu',
    key: '2',
  },
  {
    label: 'Nearby Location',
    key: '3',
  },
  {
    type: 'divider',
  },
  {
    label: 'Offer',
    key: '4',
    icon: <OfferIcon />,
    danger: true,
    disabled: true,
  },
  {
    label: 'SignIn',
    key: '5',
    icon: <ProfileIcon />,
    danger: true,
    disabled: true,
  },
  {
    label: 'Cart',
    key: '6',
    icon: <BucketIcon className="me-1" />,
    danger: true,
    disabled: true,
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};

const contentStyle = {
  backgroundColor: '#fff',
  borderRadius: '0 0 4px 4px',
};
const menuStyle = {
  boxShadow: 'none',
};
const MenuOne = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          //   colorBgContainer: 'white',
        },
      }}
    >
      <Header className="mx-auto max-w-6xl flex-space h-[80px] !rounded-full px-8 py-2 bg-white gap-2 border border-solid !border-red-500">
        <div className="flex-center gap-1">
          <LogoIcon className="shrink-0" />
          <Dropdown menu={menuProps}>
            <Button
              size="large"
              style={{
                backgroundColor: '#F2F3F8',
              }}
              className="font-medium px-4 flex-center !rounded-full border-0 !gap-1"
            >
              <LocationPinIcon className="shrink-0 !m-0" />
              Kathmandu
              <CaretDownIcon style={{ color: '#434343' }} />
            </Button>
          </Dropdown>
        </div>
        <div className="font-medium  gap-1 hidden  xl:flex-center ">
          <Link href={'#'}>
            <Button className="font-medium " type="ghost">
              Home
            </Button>
          </Link>
          <Button className="font-medium !text-dark" type="ghost">
            Menu
          </Button>
          <Button className="font-medium !text-dark " type="ghost">
            Nearby Location
          </Button>
        </div>
        <div className="flex-center gap-1">
          <Input
            placeholder="Search"
            size="large"
            bordered={false}
            className="!font-semibold w-40 hidden md:flex"
            prefix={<SearchIcon className="text-xs me-1" />}
          />
          <div className="hidden  xl:flex gap-1">
            <Button type="text">
              <span className="font-medium !flex justify-center align-middle gap-2">
                <OfferIcon className="text-xs" />{' '}
                <span className="text-base font-medium">Offer</span>
              </span>
            </Button>
            <Button type="text">
              <span className="font-medium !flex justify-center align-middle gap-2">
                <ProfileIcon /> <span className="text-base">SignIn</span>
              </span>
            </Button>
            <Button type="text">
              <span className="font-medium !flex justify-center align-middle gap-2">
                <BucketIcon /> <span className="text-base">Cart</span>
              </span>
            </Button>
          </div>
          <div className="block xl:hidden">
            <Dropdown
              menu={menuProps}
              dropdownRender={(menu) => (
                <div style={contentStyle}>
                  {React.cloneElement(menu as React.ReactElement, {
                    style: menuStyle,
                  })}
                  <Divider className="m-0 block md:hidden" />
                  <Input
                    placeholder="Search"
                    size="large"
                    bordered={false}
                    className="!font-semibold w-40 bg-white flex md:hidden"
                    prefix={<SearchIcon className="text-xs me-1" />}
                  />
                </div>
              )}
            >
              <Button
                size="large"
                style={{
                  backgroundColor: '#F2F3F8',
                }}
                className="font-medium px-4 flex-center !rounded-full border-0 !gap-1"
              >
                <MenuOutlined className="!m-0" />
                <CaretDownIcon style={{ color: '#434343' }} />
              </Button>
            </Dropdown>
          </div>
        </div>
      </Header>
    </ConfigProvider>
  );
};

export default MenuOne;
