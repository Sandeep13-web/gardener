import { UserOutlined } from "@ant-design/icons";
import {
    BucketIcon,
    CaretDownIcon,
    LocationPinIcon,
    LogoIcon,
    OfferIcon,
    ProfileIcon,
    SearchIcon
} from "@shared/ui/Icons";
import {
    Button,
    Dropdown,
    Input,
    Layout,
    MenuProps,
    message
} from "antd";
import Link from "next/link";
import React from "react";

const { Header, Content, Footer } = Layout;

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    message.info("Click on left button.");
    console.log("click left button", e);
};

const handleMenuClick: MenuProps["onClick"] = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
};

const items: MenuProps["items"] = [
    {
        label: "1st menu item",
        key: "1",
        icon: <UserOutlined />,
    },
    {
        label: "2nd menu item",
        key: "2",
        icon: <UserOutlined />,
    },
    {
        label: "3rd menu item",
        key: "3",
        icon: <UserOutlined />,
        danger: true,
    },
    {
        label: "4rd menu item",
        key: "4",
        icon: <UserOutlined />,
        danger: true,
        disabled: true,
    },
];

const menuProps = {
    items,
    onClick: handleMenuClick,
};
const FormOne = () => {
    return (

        <Header
            className="mx-24 flex-space h-[80px] rounded-xl px-8 py-2 bg-primary"
        >
            <LogoIcon className="shrink-0" />

            <Dropdown menu={menuProps}>
                <Button
                    size="large"
                    style={{
                        backgroundColor: "#F2F3F8",
                        border: "0",
                        borderRadius: "10rem",
                    }}
                    className="font-medium px-4 rounded-full flex-cente rounded-lg border-0 "
                >
                    <LocationPinIcon className="shrink-0" />
                    Kathmandu
                    <CaretDownIcon style={{ color: "#434343" }} />
                </Button>
            </Dropdown>
            <div className="font-medium flex-center gap-1">
                <Link href={"#"}>
                    <Button className="font-medium text-white" type="link">
                        Home
                    </Button>
                </Link>
                <Button className="font-medium text-white" type="link">
                    Menu
                </Button>
                <Button className="font-medium text-white " type="link">
                    Nearby Location
                </Button>
            </div>
            <div className="flex-center gap-1">
                <Input
                    placeholder="Search"
                    size="large"
                    bordered={false}
                    className="!font-semibold w-40"
                    prefix={<SearchIcon className="text-xs me-1" />}
                />
                <Button type="text">
                    <span className="font-medium !flex justify-center align-middle gap-2">
                        <OfferIcon className="text-xs" />{" "}
                        <span className="text-base font-medium">Offer</span>
                    </span>
                </Button>
                <Button type="text">
                    <span className="font-medium !flex justify-center align-middle gap-2">
                        <ProfileIcon /> <span className="text-base">SignIn</span>
                    </span>
                </Button>
                <Button type="text">
                    <span className="font-medium !flex justify-center align-middle gap-2">
                        <BucketIcon /> <span className="text-base">Cart</span>
                    </span>
                </Button>
            </div>
        </Header>
    );
};

export default FormOne;
