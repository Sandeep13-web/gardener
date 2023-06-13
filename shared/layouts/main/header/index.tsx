import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons/lib";
import { Avatar, Col, Input, Layout, Row, Switch } from "antd";
import { useTheme } from "next-themes";
import React, { Dispatch, SetStateAction } from "react";

const { Header } = Layout;
const { Search } = Input

interface Props {
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>
}

const MainLayoutHeader: React.FC<Props> = ({ collapsed, setCollapsed }) => {

    const { theme, setTheme } = useTheme();

    const toggleTheme = (e: any) => {
        if (e) {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    return (
        <Header
            className={`p-0  dark:bg-dark bg-white`}
        >
            <Row
                className="px-3"
            >
                <Col xs={18}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}</Col>
                <Col xs={6} className="flex">
                    <Row gutter={12} align={'middle'}>
                        <Col xs={5}>
                            <Row align={'middle'} >
                                <Switch
                                    checkedChildren="dark"
                                    unCheckedChildren="light"
                                    checked={theme === 'dark' && true}
                                    onChange={toggleTheme}
                                />
                            </Row>
                        </Col>
                        <Col xs={16}>
                            <Row align={'middle'} >
                                <Search placeholder="input search text" enterButton />
                            </Row>
                        </Col>
                        <Col xs={3}>
                            <Row align={'middle'} >
                                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Header >
    )
}

export default MainLayoutHeader