import { Col, Row } from 'antd';

import HomeChart from '@features/home/components/chart';
import StatsCard from '@features/home/components/stats-card';
import UserTable from '@features/home/components/user-table';
import MainLayout from '@shared/layouts/main';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Row gutter={[16, { xs: 8, sm: 16, md: 24 }]}>
          <Col lg={6} md={12} sm={24}>
            <StatsCard></StatsCard>
          </Col>
          <Col lg={6} md={12} sm={24}>
            <StatsCard></StatsCard>
          </Col>
          <Col lg={6} md={12} sm={24}>
            <StatsCard></StatsCard>
          </Col>
          <Col lg={6} md={12} sm={24}>
            <StatsCard></StatsCard>
          </Col>
        </Row>
      </Col>
      <Col xs={24}>
        <HomeChart></HomeChart>
      </Col>
      <Col xs={24}>
        <UserTable></UserTable>
      </Col>
    </Row>
  );
};

export default Home;

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

// export const getServerSideProps = () => {
//   return {
//     redirect: {
//       destination: '/auth/login',
//       permanent: true
//     }
//   }
// }
