import UserList from '@features/users/components/user-list';
import { NextPageWithLayout } from '@pages/_app';
import MainLayout from '@shared/layouts/main';

const Users: NextPageWithLayout = () => {
  return <UserList></UserList>;
};

export default Users;

Users.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout title={'Users'}>{page}</MainLayout>;
};
