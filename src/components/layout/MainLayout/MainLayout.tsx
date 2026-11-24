

import {Outlet } from "react-router-dom";
import { Layout } from "antd";
import { useLayoutViewModel } from "./useLayoutViewModel";
import { lazy } from "react";

const Header = lazy(() => import("../Header/Header"));
const Sidebar = lazy(() => import("../Sidebar/Sidebar"));


const { Sider, Content } = Layout;

const LayoutMain = () => {




  const { toggleSidebar, sidebarOpen } = useLayoutViewModel()


  return (
    <>
      <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

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
            {/* <Sidebar toggleSidebar={toggleSidebar}/> */}
            <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
          </div>
        </Sider>

        <Layout
          className={`main-layout ${sidebarOpen ? "sidebar-collapsed" : "sidebar-open"}`}
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



