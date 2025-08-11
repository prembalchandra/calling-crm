import React from "react";
import { Link } from "react-router-dom";
import './Businesssetting.css'
const items = [
  { name: "Create Status", path: "/admin/CreateStatus", icon: "bx bx-layer-plus" },
  { name: "Create Product", path: "/admin/Createproduct", icon: "bx bx-cart" },
  { name: "Create Sub Product", path: "/admin/Subproduct", icon: "bxs-layer" },
  { name: "Upload Banner", path: "/admin/UploadBanner", icon: "bxs-cloud-upload" },
  { name: "Create Designation", path: "/admin/Designation", icon: "bxs-id-card" },
  { name: "Training Video", path: "/admin/Trainingvideo", icon: "bxs-video" },
  { name: "Document", path: "/admin/Document", icon: "bxs-file-doc" },
  { name: "Pitch", path: "/admin/Pitch", icon: "bxs-megaphone" },
  { name: "Create Whats app Template", path: "/admin/CustomwhatsappMessage", icon: "bxl-whatsapp" },
  { name: "Create Text Template", path: "/admin/text-template", icon: "bxs-message-detail" },
  { name: "Create E-mail Template", path: "/admin/email-template", icon: "bxs-envelope" },
  { name: "Source", path: "/admin/Source", icon: "bxs-cube" },
  { name: "Call Frequency", path: "/admin/Callfrequency", icon: "bxs-phone-call" }
];

const Businesssetting = () => {
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

export default Businesssetting;
