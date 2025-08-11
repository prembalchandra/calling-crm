import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaKey, FaCog, FaSignOutAlt } from "react-icons/fa";
import './Header.css';
import Logoimg from '../../../assets/Images/swift-dial-logo.png';

function Header() {
  const [bgColor, setBgColor] = useState("");
  const navigate = useNavigate();
  const user = {
    name: "Balchandra",
    role: localStorage.getItem("role"), 
    image: ""
  };

  useEffect(() => {
    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    setBgColor(getRandomColor());
  }, []);

  const handleLogout = () => {
    localStorage.clear();
     window.location.reload();
    navigate("/");
  };

  const renderUserIcon = () => {
    if (user.image) {
      return (
        <img
          src={user.image}
          alt="User"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "10px"
          }}
        />
      );
    } else {
      return (
        <div
          className="user-pic"
          style={{
            backgroundColor: bgColor,
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
            marginRight: "10px"
          }}
        >
          {user.name.charAt(0)}
        </div>
      );
    }
  };

  // Common Header JSX
  const renderHeader = (menuItems) => (
    <div className="hearder-container navbar navbar-expand fixed-top">
      <div className="container-fluid">
        {/* Logo Section */}
        <div className="dnone navber-logo">
          <div className="sidebar-logo-img">
            <Link to="/">
              <img src={Logoimg} alt="swift-dial logo img" />
            </Link>
          </div>
        </div>

        {/* Right Profile Dropdown */}
        <div className="navbar-collapse collapse">
          <div className="ms-auto navbar-nav">
            <div className="w-100 header_row">
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="pro-header skeleton">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {renderUserIcon()}
                      <div className="user-names">{user.name}</div>
                    </button>
                    <ul className="dropdown-menu dropdown-basic">
                      {menuItems}
                      <li>
                        <button
                          className="profileDropdown dropdown-item d-flex align-items-center gap-2"
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt /> Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Define menu items based on role
  const superadminMenu = (
    <>
      <li>
        <Link className="profileDropdown dropdown-item d-flex align-items-center gap-2" to="/superadmin/EmployesProfile">
          <FaUser /> Profile Details
        </Link>
      </li>
      <li>
        <Link className="profileDropdown dropdown-item d-flex align-items-center gap-2" to="/superadmin/PermissionCard ">
          <FaKey /> Permissions
        </Link>
      </li>
    </>
  );

  const adminMenu = (
    <>
      <li>
        <Link className="profileDropdown dropdown-item d-flex align-items-center gap-2" to="/admin/profile">
          <FaUser /> Profile Details
        </Link>
      </li>
      <li>
        <Link className="profileDropdown dropdown-item d-flex align-items-center gap-2" to="/admin/PermissionCard">
          <FaKey /> Permissions
        </Link>
      </li>
      <li>
        <Link className="profileDropdown dropdown-item d-flex align-items-center gap-2" to="/admin/Setting">
          <FaCog /> Setting
        </Link>
      </li>
    </>
  );

  if (user.role === 'superadmin') {
    return renderHeader(superadminMenu);
  } else if (user.role === 'admin') {
    return renderHeader(adminMenu);
  } else {
    return null; 
  }
}

export default Header;
