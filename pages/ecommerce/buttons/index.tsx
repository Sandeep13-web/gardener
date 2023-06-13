
import React from 'react';

import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Button from '@shared/components/button';
import MainLayout from '@shared/layouts/main';
import { Card, List, Space, Typography } from 'antd';

const { Title } = Typography;

const Buttons = () => {

    const data = [
        {
            name: 'Color Variant',
            type: 'color'
        },
        {
            name: 'Icon Variant',
            type: 'icon'
        },
        {
            name: 'Use in Ecommerce',
            type: 'ecommerce'
        },

    ]
    return (
        <div>
            <Title level={2}>Button Component</Title>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item>
                        <Card title={item.name}>
                            {item.type === 'color' && <Space size={'middle'}>
                                <Button text="primary" type="primary" size='large' />
                                <Button text="secondary" type="secondary" size='large' />
                                <Button text="success" type="success" size='large' />
                                <Button text="warning" type="warning" size='large' />

                            </Space>}
                            {item.type === 'icon' &&
                                <Space size={'middle'}>
                                    <Button type="primary" icon={<SearchOutlined />} size='large' />
                                    <Button type="primary" text='search' icon={<SearchOutlined />} size='large' />
                                </Space>
                            }
                            {item.type === 'ecommerce' &&
                                <Space size={'middle'}>
                                    <Button type="primary" text='title' size='large' />
                                    <Button type="link" text='link Button' size='large' />
                                    <Button type="primary" text='Add to cart' icon={<ShoppingCartOutlined />} size='large' />
                                </Space>
                            }
                        </Card>
                    </List.Item >
                )
                }
            />


        </div >
    )
}

export default Buttons



Buttons.getLayout = function getLayout(page: React.ReactElement) {
    return <MainLayout title="Ecommerce">{page}</MainLayout>;
};