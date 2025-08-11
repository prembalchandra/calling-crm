import React from "react";
import { Link } from "react-router-dom";
const items = [
  { name: "Create Status", path: "/superadmin/CreateStatus", icon: "bx bx-layer-plus" },
  { name: "Create Verticals", path: "/superadmin/Verticals", icon: "bx bx-cart" },
  { name: "Create Industry", path: "/superadmin/Industry", icon: "bxs-layer" },
  { name: "Create Product", path: "/superadmin/Createproduct", icon: "bx bx-cart" },
  { name: "Create Sub Product", path: "/superadmin/Subproduct", icon: "bxs-layer" },
  { name: "Create Whats app Template", path: "/superadmin/CustomwhatsappMessage", icon: "bxl-whatsapp" },
  { name: "Create Text Template", path: "/superadmin/Customtextmessage", icon: "bxs-message-detail" },
  { name: "Create E-mail Template", path: "superadmin/emailtemplate", icon: "bxs-envelope" },
  { name: "Training Video", path: "/superadmin/Trainingvideo", icon: "bxs-video" },
  { name: "Document", path: "/superadmin/Document", icon: "bxs-file-doc" },
  { name: "Pitch", path: "/superadmin/Pitch", icon: "bxs-megaphone" },
];

const Supportingtools = () => {
  return (
    <section className='main-content-area'>
      <div className="dashboard-container">
        {items.map((item, index) => (
          <Link to={item.path} className="card-box" key={index}>
            <i className={`bx ${item.icon} icon`}></i>
            <h4>{item.name}</h4>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Supportingtools;
