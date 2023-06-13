import Image from 'next/image';
// import { addtocart, heart, kfcimage, nonVeg } from 'imageConfig';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Button from '@shared/components/button';
import { Badge, Card, Divider, List, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';


interface IProduct {
    brand: string,
    category: string,
    description: string,
    discountPercentage: number,
    id: number,
    images: Array<string>,
    price: number,
    rating: number,
    stock: number,
    thumbnail: string,
    title: string
}

const { Title } = Typography
const CardOne = () => {
    const [data, setData] = useState<Array<IProduct>>([]);


    const fetchProduct = async () => {
        try {
            var response = await fetch('https://dummyjson.com/products');
            var jsonData = await response.json();
            setData(jsonData.products);
            // console.log('jsonData', jsonData.products);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <>
            <List
                grid={{
                    gutter: 60,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                }}
                pagination={{ position: 'bottom', align: 'end', defaultPageSize: 4 }}
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item>
                        <Badge.Ribbon text={`${item?.discountPercentage} %`} color='green'>
                            <Card

                                hoverable
                                key={`product-${index}`}
                                title={item?.title}
                                cover={
                                    <Image
                                        src={item?.thumbnail}
                                        alt={'product-image'}
                                        height={250}
                                        width={250}
                                        className='border-radius-0'
                                    />
                                }
                            >
                                <Tag color="magenta">{item?.category}</Tag>
                                <Divider orientation="left"></Divider>
                                <Card.Meta
                                    title={item.title}
                                    description={
                                        <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }} >
                                            {item?.description}
                                        </Typography.Paragraph>
                                    }
                                />
                                <div className='flex items-center mt-3'>
                                    <Title level={5} className='!m-0'>
                                        Rs {item.price}
                                    </Title>
                                    <div className="ms-auto">
                                        <Button text='Add to cart' icon={<ShoppingCartOutlined />} size='middle' />
                                    </div>

                                </div>
                            </Card>
                        </Badge.Ribbon>
                    </List.Item >
                )}
            />

        </>
    );
}

export default CardOne;

