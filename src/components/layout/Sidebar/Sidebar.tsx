
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, type MenuProps } from "antd";
import {
    DashboardOutlined,
    UserAddOutlined,
    HistoryOutlined,
} from "@ant-design/icons";

import "./Sidebar.css";
import type { Props } from "../../../interfaces/interfaces";



type MenuItem = Required<MenuProps>["items"][number];

const Sidebar = ({ toggleSidebar, sidebarOpen }: Props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const items: MenuItem[] = [
        {
            key: "/",
            icon: <DashboardOutlined />,
            label: "Dashboard",
        },
        {
            key: "/register",
            icon: <UserAddOutlined />,
            label: "New Application",
        },
        {
            key: "/history",
            icon: <HistoryOutlined />,
            label: "Submission History",
        },
    ];

    return (
        <Menu
            mode="inline"
            theme="dark"
            inlineIndent={30}
            className="custom-sidebar-menu"
            items={items}
            selectedKeys={[location.pathname]}
            onClick={({ key }) => {
                navigate(key);

                if (!sidebarOpen) {
                    toggleSidebar();
                }
            }}
        />
    );
};

export default Sidebar;
