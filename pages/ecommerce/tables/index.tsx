import CartComponent from "@features/ecommerce/table/cart";
import { NextPageWithLayout } from "@pages/_app";
import MainLayout from "@shared/layouts/main";
import { Card, List, Typography } from 'antd';

const { Title } = Typography;

const TableComponent: NextPageWithLayout = () => {
    const data = [

        {
            name: 'Cart',
            item: <CartComponent />
        },

    ]


    return (
        <div>
            <Title level={2}>Table Component</Title>
            <List
                itemLayout="horizontal"
                dataSource={data}
                grid={{ gutter: 16, column: 1 }}
                renderItem={(prev) => (
                    <List.Item>
                        <Card
                            title={
                                <div className="flex items-center gap-3 text-lg uppercase">
                                    <Typography.Text>
                                        {prev?.name}
                                    </Typography.Text>
                                </div>
                            }
                        > {prev?.item}

                        </Card>
                    </List.Item>

                )}
            />
        </div>
    )
}

export default TableComponent;

TableComponent.getLayout = function getLayout(page: React.ReactElement) {
    return <MainLayout title="Ecommerce">{page}</MainLayout>;
};