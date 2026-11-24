

import logo from "../../../assets/logo.png";
import userImg from "../../../assets/face1.jpg";


import "./Header.css"
import type { HeaderProps } from "../../../interfaces/interfaces";
import { utilLog } from "../../../utils/utils";


const Header = ({ toggleSidebar, sidebarOpen }: HeaderProps) => {
  utilLog({ sidebarOpen })
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


          {/* <li className="nav-item dropdown">

          <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
            <i className="bi bi-bell"></i>a
            <span className="badge bg-primary badge-number">4</span>
          </a>

          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
            <li className="dropdown-header">
              You have 4 new notifications
              <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
            </li>
            <li>
              <hr className="dropdown-divider"/>
            </li>

            <li className="notification-item">
              <i className="bi bi-exclamation-circle text-warning"></i>
              <div>
                <h4>Lorem Ipsum</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>30 min. ago</p>
              </div>
            </li>

            <li>
              <hr className="dropdown-divider"/>
            </li>

            <li className="notification-item">
              <i className="bi bi-x-circle text-danger"></i>
              <div>
                <h4>Atque rerum nesciunt</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>1 hr. ago</p>
              </div>
            </li>

            <li>
              <hr className="dropdown-divider"/>
            </li>

            <li className="notification-item">
              <i className="bi bi-check-circle text-success"></i>
              <div>
                <h4>Sit rerum fuga</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>2 hrs. ago</p>
              </div>
            </li>

            <li>
              <hr className="dropdown-divider"/>
            </li>

            <li className="notification-item">
              <i className="bi bi-info-circle text-primary"></i>
              <div>
                <h4>Dicta reprehenderit</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>4 hrs. ago</p>
              </div>
            </li>

            <li>
              <hr className="dropdown-divider"/>
            </li>
            <li className="dropdown-footer">
              <a href="#">Show all notifications</a>
            </li>

          </ul>

        </li> */}

          <li className="nav-item dropdown pe-3">

            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <img src={userImg} alt="User" width="32" height="32" className="rounded-circle me-2" />
              <span className="d-none d-md-block dropdown-toggle ps-2">    User</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">

                                <div className="d-flex flex-column">
                  <span
                    className="fw-bold"
                    title="User Name"
                  >
                    User Name
                  </span>

                  <span className="text-muted">
                    Useremail.com
                  </span>
                </div>

                <div className="d-flex flex-column">
                 
                </div>

              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
                <li>
                <button
                  type="button"
                  className="dropdown-item d-flex align-items-center"
                  // onClick={() => navigate(URL_PATH.singleURLs.changePassword)}
                >
                  <i className="bi bi-lock"></i>
                  <span>Change Password</span>
                </button>

              </li>

              

              <li>
                <hr className="dropdown-divider" />
              </li>

                              <button
                  type="button"
                  // onClick={handleLogout}
                  className="dropdown-item d-flex align-items-center" >
                  <i className="bi bi-box-arrow-right"></i>
                  <span >Sign Out</span>
                </button>


              <li>
                <hr className="dropdown-divider" />
              </li>

           

            </ul>
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default Header;
