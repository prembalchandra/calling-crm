import React from "react";
import { Link } from "react-router-dom";

const items = [
    { name: "Privacy Policy", path: "/admin/Privacypolicy", icon: "bx bx-lock" },
    { name: "Terms & Conditions", path: "/admin/Termsconditions", icon: "bx bx-file" },
    { name: "Contact Supports", path: "/admin/Contactsupports", icon: "bx bx-support" },
    { name: "Delete Account", path: "/admin/Deleteaccount", icon: "bx bx-trash" },
];

const Setting = () => {
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

export default Setting;
