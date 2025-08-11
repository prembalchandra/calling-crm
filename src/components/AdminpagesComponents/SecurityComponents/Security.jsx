import React from "react";
import { Link } from "react-router-dom";
const items = [
  { name: "Import Data", path: "/admin/ImportData", icon: "bx bx-import" },
  { name: "Assign Data", path: "/admin/Assigndata", icon: "bx bx-cart" },
];

const Security = () => {
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

export default Security;
