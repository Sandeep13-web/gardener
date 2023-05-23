import { NextPageWithLayout } from "@pages/_app";
import MainLayout from "@shared/layouts/main";
import { Card, List, Typography } from 'antd';
import { useRouter } from "next/router";
import { AiOutlineForm, AiTwotoneCreditCard } from 'react-icons/ai';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';

const { Title } = Typography;

const Ecommerce: NextPageWithLayout = () => {
    const router = useRouter();
    const data = [
        {
            name: 'menu',
            icon: <BsFillMenuButtonWideFill />,
            list: [
                {
                    title: 'header',
                    designedBy: 'Sandeep',
                },
                {
                    title: 'sidebar',
                    designedBy: 'Sandeep',
                }
            ]
        },
        {
            name: 'card',
            icon: <AiTwotoneCreditCard />,
            list: [
                {
                    title: 'products',
                    designedBy: 'bijayata',
                },

            ]
        },
        {
            name: 'form',
            icon: <AiOutlineForm />,
            list: [
                {
                    title: 'signup',
                    designedBy: 'saman',
                },

            ]
        }
    ]

    const goto = (type: string) => {
        router.push(`ecommerce/${type}`)
    }
    return (
        <div>
            <Title level={2}>Ecommerce Component</Title>
            <List
                itemLayout="horizontal"
                dataSource={data}
                grid={{ gutter: 16, column: 4 }}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            onClick={() => goto(item?.name)}
                            title={
                                <div className="flex items-center gap-3 text-lg uppercase">
                                    {item.icon}
                                    <Typography.Text>
                                        {item?.name}
                                    </Typography.Text>
                                </div>
                            }
                        >
                            <List
                                className="demo-loadmore-list"
                                itemLayout="horizontal"
                                dataSource={item?.list}
                                renderItem={(item) => (
                                    <List.Item
                                    >
                                        <List.Item.Meta
                                            title={<a href="https://ant.design" className="capitalize">{item?.title}</a>}
                                        />
                                        <div className="capitalize">by {item?.designedBy}</div>
                                    </List.Item>
                                )} />
                        </Card>
                    </List.Item>

                )}
            />
        </div>
    )
}

export default Ecommerce

Ecommerce.getLayout = function getLayout(page: React.ReactElement) {
    return <MainLayout title="Ecommerce">{page}</MainLayout>;
};