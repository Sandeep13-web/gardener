import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons/lib";
import { ThemeContext } from "@pages/_app";
import { hFull } from '@styles/global-styles/global.styles';
import { Avatar, Col, Input, Layout, Row, Switch } from "antd";
import React, { Dispatch, SetStateAction, useContext } from "react";

const { Header } = Layout;
const { Search } = Input

interface Props {
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>
}

const MainLayoutHeader: React.FC<Props> = ({ collapsed, setCollapsed }) => {

    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

    const toggleTheme = () => {
        toggleDarkMode()
    }
    return (
        <Header
            style={{
                padding: 0,
            }}
        >
            <Row style={{ paddingRight: 20 }}>
                <Col xs={18}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}</Col>
                <Col xs={6}>
                    <Row gutter={12} className={hFull} justify={'space-between'}>
                        <Col xs={4}>
                            <Row align={'middle'} className={hFull}>
                                <Switch checkedChildren="dark" unCheckedChildren="light" checked={isDarkMode}
                                    onChange={toggleTheme}
                                />
                            </Row>
                        </Col>
                        <Col xs={16}>
                            <Row align={'middle'} className={hFull}>
                                <Search placeholder="input search text" enterButton />
                            </Row>
                        </Col>
                        <Col xs={4}>
                            <Row align={'middle'} className={hFull}>
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