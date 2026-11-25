

import { Card, Col, Row, Statistic, Spin } from "antd";

import grddd from "../../assets/grddd.jpeg";
import {
    TeamOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    FileTextOutlined,
    ArrowRightOutlined,
} from "@ant-design/icons";

import { Doughnut, Bar } from "react-chartjs-2";
import { useDashboard } from "./useDashboard";




const Dashboard = () => {

    const { loading ,  totalStudents , eligibleStudents , notEligibleStudents , doughnutData , chartOptions , barData} = useDashboard()
   
    return (
        <div id="main" className="main">
            <div className="page-header">
                <div className="page-header-left d-flex align-items-center">
                    <div className="page-header-title">
                        <h5 className="m-b-10">Dashboard</h5>
                    </div>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            Welcome to your Course Eligibility Portal.
                        </li>
                    </ul>
                </div>
            </div>

            <section className="section">
                <Spin spinning={loading}>
                    <Row gutter={[16, 16]} align="stretch">

                        <Col xs={24} xl={16}>
                            <div className="d-flex flex-column h-100">
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} sm={12}>
                                        <Card
                                            bordered={false}
                                            className="h-100"
                                            style={{
                                                background: "#e8efff",
                                                borderLeft: "5px solid #3157a4",
                                                borderRadius: 10,
                                            }}
                                        >
                                            <Statistic
                                                title="Total Applications"
                                                value={totalStudents}
                                                prefix={<FileTextOutlined />}
                                                valueStyle={{ color: "#24488f" }}
                                            />
                                        </Card>
                                    </Col>

                                    <Col xs={24} sm={12}>
                                        <Card
                                            bordered={false}
                                            className="h-100"
                                            style={{
                                                background: "#e6f5f0",
                                                borderLeft: "5px solid #15966b",
                                                borderRadius: 10,
                                            }}
                                        >
                                            <Statistic
                                                title="Total Students"
                                                value={totalStudents}
                                                prefix={<TeamOutlined />}
                                                valueStyle={{ color: "#087a55" }}
                                            />
                                        </Card>
                                    </Col>

                                    <Col xs={24} sm={12}>
                                        <Card
                                            bordered={false}
                                            className="h-100"
                                            style={{
                                                background: "#e8f5e9",
                                                borderLeft: "5px solid #2e9b50",
                                                borderRadius: 10,
                                            }}
                                        >
                                            <Statistic
                                                title="Eligible Students"
                                                value={eligibleStudents}
                                                prefix={<CheckCircleOutlined />}
                                                valueStyle={{ color: "#21813d" }}
                                            />
                                        </Card>
                                    </Col>

                                    <Col xs={24} sm={12}>
                                        <Card
                                            bordered={false}
                                            className="h-100"
                                            style={{
                                                background: "#fff0ed",
                                                borderLeft: "5px solid #dc5145",
                                                borderRadius: 10,
                                            }}
                                        >
                                            <Statistic
                                                title="Not Eligible"
                                                value={notEligibleStudents}
                                                prefix={<CloseCircleOutlined />}
                                                valueStyle={{ color: "#c7352b" }}
                                            />
                                        </Card>
                                    </Col>
                                </Row>

                                {/* Welcome Banner */}
                                <Card
                                    className="mt-4 flex-grow-1"
                                    bordered={false}
                                    style={{
                                        background: "linear-gradient(120deg, #101b33, #244879)",
                                        borderRadius: 10,
                                        overflow: "hidden",
                                    }}
                                >
                                    <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center">
                                        <div className="me-sm-4 mb-3 mb-sm-0">
                                            <FileTextOutlined
                                                style={{ fontSize: 45, color: "#ddb937" }}
                                            />
                                        </div>

                                        <div className="flex-grow-1 w-100" style={{ minWidth: 0 }}>
                                            <h4 className="text-white fw-bold mb-2">
                                                Welcome to Campus Portal
                                            </h4>

                                            <p className="mb-3 text-wrap" style={{ color: "#d6deed" }}>
                                                Manage student applications, evaluate admission
                                                eligibility and track submission history from one place.
                                            </p>

                                            <span
                                                className="badge px-3 py-2 text-wrap text-start"
                                                style={{
                                                    background: "#ddb937",
                                                    color: "#101b33",
                                                    fontSize: 13,
                                                    whiteSpace: "normal",
                                                }}
                                            >
                                                Your Admission Management Dashboard
                                                <ArrowRightOutlined className="ms-2" />
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Col>

                        <Col xs={24} xl={8}>
                            <div
                                className="position-relative overflow-hidden rounded-3 h-100"
                                style={{ minHeight: 450 }}
                            >
                                <img
                                    src={grddd}
                                    alt="University students celebrating graduation"
                                    className="position-absolute top-0 start-0 w-100 h-100"
                                    style={{ objectFit: "cover" }}
                                />

                                <div
                                    className="position-absolute bottom-0 start-0 w-100 p-4"
                                    style={{
                                        background: "linear-gradient(transparent, rgba(10,25,50,0.95))",
                                    }}
                                >
                                    <h3 className="text-white fw-bold mb-2">
                                        Building a Brighter Future
                                    </h3>

                                    <p className="text-white mb-0">
                                        Your Admission, Our Priority
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {/* Dashboard Charts */}
                    <Row gutter={[16, 16]} className="mt-3">
                        <Col xs={24} lg={10}>
                            <Card
                                title="Eligibility Overview"
                                
                                bordered={false}
                                className="h-100"
                            >
                                <div style={{ height: 280 }}>
                                    <Doughnut
                                        data={doughnutData}
                                        options={chartOptions}
                                    />
                                </div>
                            </Card>
                        </Col>

                        <Col xs={24} lg={14}>
                            <Card
                                title="Course-wise Applications"
                                bordered={false}
                                className="h-100"
                            >
                                <div style={{ height: 280 }}>
                                    <Bar
                                        data={barData}
                                        options={{
                                            ...chartOptions,
                                            plugins: {
                                                legend: {
                                                    display: false,
                                                },
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true,
                                                    ticks: {
                                                        precision: 0,
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Spin>
            </section>
        </div>
    );
};

export default Dashboard;
