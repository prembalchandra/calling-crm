import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumb.css";

function Breadcrumb({ title, titleIcon, buttons }) {
  return (
    <div className="d-flex dashBoard_header">
      <div className="dashTitle">
        <h1 className="h1-text">
          {titleIcon && <i className={`${titleIcon} me-2`} aria-hidden="true"></i>}
          {title}
        </h1>
      </div>
      <div id="nav-filter" className="dashboardNav dashfilter">
        <div className=" d-flex justify-content-end gap-2 nav align-items-center">
          {buttons.map((button, index) => (
            <div className="nav-item" key={index}>
              <Link to={button.link || "#"} className={` ${button.className}`}>
                {button.icon && <i className={`me-2 ${button.icon}`}></i>}
                {button.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Breadcrumb;
