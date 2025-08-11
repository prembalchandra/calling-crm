
import React from 'react'
import { Link } from "react-router-dom";

function Bredbrcumb() {
    return (

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-4">
                <div className="admin-content-box text-start d-flex flex-column gap-1">
                    <h4 className="admin-name admin-heading fs-6"> <span>Welcome </span><span>Suerp amdin</span></h4>
                    </div>
                <div className="Company-details-box">
                    <div className="d-flex gap-4 justify-content-center text-center">
                        <div className="d-flex flex-column">
                            <div className="fs-13 text-muted">No. of Caller</div>
                            <Link className="text-decoration-non" to="/admin/number-of-caller">80</Link>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="fs-13 text-muted">Active Caller</div>
                            <Link className="text-decoration-non" to="/admin/active-caller">20</Link>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="fs-13 text-muted">Inactive Caller</div>
                            <Link className="text-decoration-non" to="/admin/inactive-caller">10</Link>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Bredbrcumb