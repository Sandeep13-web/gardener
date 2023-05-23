import { Card, Col, Row, Space } from 'antd';
// import { addtocart, heart, kfcimage, nonVeg } from 'imageConfig';
import { useEffect, useState } from 'react';

// import {heart} from 'imageConfig'

//   export default Card;

const CardOne = () => {
    const [data, setData] = useState<any[] | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                var response = await fetch('https://dummyjson.com/products');
                var jsonData = await response.json();
                setData(jsonData.products);
                // console.log('jsonData', jsonData.products);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Row gutter={16}>
                <Space direction="vertical" size={16}>
                    {data !== null ? (
                        <ul>
                            {data.map((item: any, index) => (
                                <Card style={{ width: 300 }} key={`cards-${index}`}>
                                    <div className="card-top" style={{ height: '282px' }}>
                                        {/* <div style={{ position: 'relative' }}>
                                            <Image src={kfcimage} alt="Example" />
                                        </div>

                                        <div style={{ position: 'absolute', left: 20, top: 20 }}>
                                            <Image src={nonVeg} alt="" />
                                        </div>
                                        <div style={{ position: 'absolute', right: 20, top: 20 }}>
                                            <Image src={heart} alt="" />
                                        </div> */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '260px',
                                                color: '#FF8910',
                                                background: 'rgb(255, 137, 16, 0.2)',
                                                opacity: 0.6,
                                                borderRadius: '10px',
                                                padding: '4px 8px',
                                            }}
                                        >
                                            25% off on deals
                                        </div>
                                    </div>

                                    <div
                                        style={{ borderTop: '1px solid black' }}
                                    >
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                        <div>
                                            <Row style={{ alignItems: 'center' }}>
                                                <Col span={12}>
                                                    <span style={{ fontWeight: '700', color: '#32373D' }}>
                                                        Rs {item.price}
                                                    </span>
                                                </Col>
                                                <Col span={12}>
                                                    <button
                                                        style={{
                                                            float: 'right',
                                                            borderRadius: '12px',
                                                            background: '#E5002B',
                                                            color: '#fff',
                                                            border: 'none',
                                                            padding: '10px',
                                                        }}
                                                    >
                                                        Add To Cart
                                                        {/* <Image src={addtocart} />Add To Cart */}
                                                    </button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </ul>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Space>
            </Row>
        </div>
    );
}

export default CardOne;

