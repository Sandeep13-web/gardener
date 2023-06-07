import FormTwo from "@features/ecommerce/form/FormTwo";
import { NextPageWithLayout } from "@pages/_app";
import MainLayout from "@shared/layouts/main";
import { Card, List, Typography } from 'antd';

const { Title } = Typography;

const FormComponent: NextPageWithLayout = () => {
    const data = [
        // {
        //     name: 'Form ',
        //     item: <FormOne />
        // },
        {
            name: 'Form 2',
            item: <FormTwo />
        },

    ]


    return (
        <div>
            <Title level={2}>Form Component</Title>
            <List
                itemLayout="horizontal"
                dataSource={data}
                grid={{ gutter: 16, column: 2 }}
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

export default FormComponent;

FormComponent.getLayout = function getLayout(page: React.ReactElement) {
    return <MainLayout title="Ecommerce">{page}</MainLayout>;
};