import React from 'react';
import Breadcrumb from '../../../MainComponents/breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';
function employersentmsg({ companyName }) {
    return (
        <section className="main-content-area">
            <Breadcrumb
                title="Employer sent msg to Client"
                titleIcon="bx bx-message icon"
                buttons={[
                    {
                        label: (
                            <Link to="/superadmin/MessageCards">
                                <button type="button" className="addTaskBtn">
                                    <i className="bx bx-arrow-back"></i> Back
                                </button>
                            </Link>
                        ),
                    },
                ]}
            />
            <div className="row-bg mt-3">
                <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
                    <p>Hi,</p>
                    <p>
                        Thank you for showing interest in our services at <strong>{companyName}</strong>. One of our
                        representatives will connect with you shortly to assist you further.
                    </p>
                    <p>Looking forward to speaking with you.</p>
                    <p>Best regards,</p>
                    <p><strong>{companyName}</strong> Team</p>
                </div>
            </div>

        </section>
    );
}

export default employersentmsg;
