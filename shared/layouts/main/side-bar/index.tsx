import {
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShopFilled,
  UnorderedListOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons/lib';
import { clearAuthFromStorage } from '@shared/utils/cookies-utils/cookies.util';
import { TOAST_TYPES, showToast } from '@shared/utils/toast-utils/toast.util';
import { Layout, Menu } from 'antd';
import { SIDEBAR } from 'constants/sidebar.constants';
import { useRouter } from 'next/router';


const { Sider } = Layout;

const MainLayoutSidebar = ({ collapsed }: { collapsed: boolean }) => {
  const router = useRouter();

  const handleLogout = () => {
    clearAuthFromStorage();
    router.push('/auth/login');
    showToast(TOAST_TYPES.success, 'You have been logged out.');
  };

  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: SIDEBAR.HOME,
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: SIDEBAR.USER,
      children: [
        {
          key: 'sub-user-menu-1',
          icon: <UnorderedListOutlined />,
          label: 'List',
        },
        {
          key: 'sub-user-menu-2',
          icon: <UserAddOutlined />,
          label: 'Add',
        },
      ],
    },
    {
      key: '3',
      icon: <SettingOutlined />,
      label: SIDEBAR.SETTINGS,
    },
    {
      key: '4',
      icon: <ShopFilled />,
      label: SIDEBAR.ECOMMERCE,
    },
    {
      key: '5',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ]


  const handleMenu = (key: string) => {
    switch (key) {
      case '1':
        router.push('/');
        break;
      case 'sub-user-menu-1':
        router.push('/users');
        break;
      case 'sub-user-menu-2':
        router.push('/users/create');
        break;
      case '3':
        router.push('/settings');
      case '4':
        router.push('/ecommerce');
        break;
      case 'menu':
        router.push('/ecommerce/menu');
        break;
      case 'card':
        router.push('/ecommerce');
        break;
      case 'account-details':
        router.push('/ecommerce/account-details');
        break;
      case '4':
        handleLogout();
        break;
    }
  }
  return (
    <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
      <div className='p-3'>
        <div className={`h-12  rounded-md flex items-center justify-center  `}>LOGO</div>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={menuItems}
        onClick={(value) => handleMenu(value.key)}
      />
    </Sider>
  );
};

export default MainLayoutSidebar;
