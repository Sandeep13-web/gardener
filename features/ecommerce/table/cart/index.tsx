import { Button, Image, InputNumber, Space, Table } from 'antd';
import { useState } from 'react';

function CartComponent() {
    const [cartItems, setCartItems] = useState([
        {
            key: '1',
            image: 'https://images.kfcpakistan.com/image/1664273695795-image.png',
            name: 'Product 1',
            price: '$10.00',
            quantity: 2,
            subtotal: '$20.00',
        },
        {
            key: '2',
            image: 'https://images.kfcpakistan.com/image/1664273695795-image.png',
            name: 'Product 2',
            price: '$15.00',
            quantity: 1,
            subtotal: '$15.00',
        },
    ]);

    const handleQuantityChange = (key: string, quantity: number) => {
        const updatedCartItems = cartItems.map((item) =>
            item.key === key ? { ...item, quantity } : item
        );
        setCartItems(updatedCartItems);
    };

    const handleRemoveItem = (key: string) => {
        const updatedCartItems = cartItems.filter((item) => item.key !== key);
        setCartItems(updatedCartItems);
    };

    const columns = [
        {
            title: 'Product Details',
            dataIndex: 'product',
            render: (text: any, record: any) => (
                <Space size={'middle'}>
                    <Image src={record.image} alt={record.name} width={80} />
                    <span>{record.name}</span>
                </Space>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (text: any, record: any) => (
                <InputNumber
                    min={1}
                    value={record.quantity}
                    onChange={(value) => handleQuantityChange(record.key, value)}
                />
            ),
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
        },
        {
            title: 'Action',
            render: (text: string, record: any) => (
                <Button type="primary" onClick={() => handleRemoveItem(record.key)}>
                    Remove
                </Button>
            ),
        },
    ];

    return <Table columns={columns} dataSource={cartItems} pagination={false} />;
}

export default CartComponent;
