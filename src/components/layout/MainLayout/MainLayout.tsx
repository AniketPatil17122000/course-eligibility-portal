
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { useLayoutViewModel } from "./useLayoutViewModel";
import { lazy, useEffect, useState } from "react";

const Header = lazy(() => import("../Header/Header"));
const Sidebar = lazy(() => import("../Sidebar/Sidebar"));

const { Sider, Content } = Layout;

const LayoutMain = () => {
    const { toggleSidebar, sidebarOpen } = useLayoutViewModel();

    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    const toggleTheme = () => {
        setIsDarkMode((prev) => {
            const newTheme = !prev;
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            return newTheme;
        });
    };

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            isDarkMode ? "dark" : "light"
        );
    }, [isDarkMode]);

    return (
        <>
            <Header
                toggleSidebar={toggleSidebar}
                sidebarOpen={sidebarOpen}
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
            />

            <Layout style={{ minHeight: "100vh" }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth={70}
                    collapsible
                    collapsed={sidebarOpen}
                    trigger={null}
                    width={250}
                    className="sidebarImage_config"
                >
                    <div className="sidebar-scroll">
                        <Sidebar
                            toggleSidebar={toggleSidebar}
                            sidebarOpen={sidebarOpen}
                        />
                    </div>
                </Sider>

                <Layout
                    className={`main-layout ${
                        sidebarOpen ? "sidebar-collapsed" : "sidebar-open"
                    }`}
                >
                    <Content className="main-content">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default LayoutMain;
