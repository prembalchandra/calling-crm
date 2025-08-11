// src/LayoutComponents/Sidebar/Sidebar.js

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logoimg from '../../../assets/Images/swift-dial-logo.png';
import "./Sidebar.css";

import {
  FaThLarge,
  FaBriefcase,
  FaPhoneAlt,
  FaToolbox,
  FaUserCircle,
  FaShieldAlt
} from 'react-icons/fa';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  const SuperadminmenuItems = [
    { name: "Dashboard", link: "/superadmin", icon: <FaThLarge /> },
    { name: "Employers", link: "/superadmin/Employers", icon: <FaBriefcase /> },
    { name: "Callers", link: "/superadmin/Callers", icon: <FaPhoneAlt /> },
    { name: "Supporting Tools", link: "/superadmin/SupportingTools", icon: <FaToolbox /> }
  ];

  const adminmenuItems = [
    { name: "Dashboard", link: "/admin", icon: <FaThLarge /> },
    { name: "My Team", link: "/admin/Team", icon: <FaUserCircle /> },
    { name: "Call Log", link: "/admin/call-log", icon: <i className='bx bxs-phone-incoming'></i> },
    { name: "Call Reporting", link: "/admin/call-reporting", icon: <i className='bx bx-phone-outgoing'></i> },
    { name: "Business Setting", link: "/admin/Businesssetting", icon: <FaBriefcase /> },
    { name: "Security", link: "/admin/Security", icon: <FaShieldAlt /> }
  ];

  const menuItems = userRole === "superadmin" ? SuperadminmenuItems : adminmenuItems;
  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <div
        className={`hamburger toggle-sidebar ${isOpen ? "is-active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="line"></span>
        <span className="line middleLine"></span>
        <span className="line"></span>
      </div>

      <aside className="sidebar-root sidebar-root-id sidebar-wrapper">
        <div className={`sidebar-container sidebar-css-inner ${isOpen ? "show-sidebar" : ""}`}>
          <div className="sidebar-logo-img">
            <Link to="/">
              <img src={Logoimg} alt="swift-dial logo" />
              <span>Swift Dial</span>
            </Link>
          </div>

          <nav className="menu-root sidebar">
            <ul className="menu-root-list">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`menu-item-root sidebar_item ${isActive(item.link) ? "active" : ""}`}
                >
                  
                  <Link to={item.link} className="sidebar-menu-button">
                    <span className="sidebar-icon">{item.icon}</span>
                    <span className="menu-label">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
