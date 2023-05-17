import { NextPageWithLayout } from "@pages/_app";
import MainLayout from "@shared/layouts/main";

import { Card, Col, Row, Typography } from 'antd';

const { Title } = Typography;

const Ecommerce: NextPageWithLayout = () => {
    return (
        <div>
            <Title level={2}>Ecommerce Component</Title>
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="Menu" bordered={false}>
                        Menu
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Card" bordered={false}>
                        Card
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Account Details" bordered={false}>
                        Account Details
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Ecommerce

Ecommerce.getLayout = function getLayout(page: React.ReactElement) {
    return <MainLayout title="Ecommerce">{page}</MainLayout>;
};