
import logo from "../../../assets/logo.png";
import userImg from "../../../assets/face1.jpg";

import "./Header.css";
import type { HeaderProps } from "../../../interfaces/interfaces";
import { utilLog } from "../../../utils/utils";

const Header = ({
    toggleSidebar,
    sidebarOpen,
    isDarkMode,
    toggleTheme,
}: HeaderProps) => {
    utilLog({ sidebarOpen });

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
                <div className="logo d-flex align-items-center">
                    <img src={logo} alt="Logo" />
                </div>

                <i
                    className="bi bi-list toggle-sidebar-btn"
                    onClick={toggleSidebar}
                    role="button"
                    aria-label="Toggle sidebar"
                />
            </div>

            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">

                    <li className="nav-item me-3">
                        <button
                            type="button"
                            className="btn btn-outline-light rounded-circle p-2"
                            onClick={toggleTheme}
                            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            <i className={`bi ${isDarkMode ? "bi-sun-fill" : "bi-moon-fill"}`} />
                        </button>
                    </li>

                    <li className="nav-item dropdown pe-3">
                        <a
                            className="nav-link nav-profile d-flex align-items-center pe-0"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            <img
                                src={userImg}
                                alt="User"
                                width="32"
                                height="32"
                                className="rounded-circle me-2"
                            />
                            <span className="d-none d-md-block dropdown-toggle ps-2">
                                User
                            </span>
                        </a>

                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <div className="d-flex flex-column">
                                    <span className="fw-bold">User Name</span>
                                    <span className="text-muted">Useremail.com</span>
                                </div>
                            </li>

                            <li><hr className="dropdown-divider" /></li>

                            <li>
                                <button
                                    type="button"
                                    className="dropdown-item d-flex align-items-center"
                                >
                                    <i className="bi bi-lock" />
                                    <span>Change Password</span>
                                </button>
                            </li>

                            <li><hr className="dropdown-divider" /></li>

                            <li>
                                <button
                                    type="button"
                                    className="dropdown-item d-flex align-items-center"
                                >
                                    <i className="bi bi-box-arrow-right" />
                                    <span>Sign Out</span>
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
