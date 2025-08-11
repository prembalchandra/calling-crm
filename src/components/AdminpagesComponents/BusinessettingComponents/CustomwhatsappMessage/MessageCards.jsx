import React from 'react';
import Breadcrumb from '../../../MainComponents/breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';



const messages = [
    {
        title: 'Interested',
        message: `Hi [Name], thank you for showing interest in our service. Our team will connect with you shortly to assist further. – [App Name]`
    },
    {
        title: 'Not Interested',
        message: `Hi [Name], we tried reaching you today but couldn’t connect. Let us know a convenient time to call back. – [App Name]`
    },
    {
        title: 'Not Connected',
        message: `Hi [Name], we tried reaching you today but couldn’t connect. Let us know a convenient time to call back. – [App Name]`
    }
];

function MessageCards() {
    return (
        <section className="main-content-area">
            <Breadcrumb
                title="Custom Whatsapp Message"
                titleIcon="bx bxl-whatsapp icon"
                buttons={[
                    {
                        label: (
                            <Link to="/admin/CustomwhatsappMessage">
                                <button type="button" className="addTaskBtn">
                                    <i className="bx bx-arrow-back"></i> Back
                                </button>
                            </Link>
                        ),
                    },
                ]}
            />
            <div className='card-container  mt-4'>
                <div className="row">
                    {messages.map((msg, index) => (
                        <div key={index} className=" col-md-4 mb-3">
                            <Link to="/admin/Employersentmsg">
                                <div className='card-box custom-messages-card'>
                                    <p className="message">{msg.message}</p>
                                    <h6 className="title">{msg.title}</h6>
                                </div>
                            </Link>

                        </div>
                    ))}

                </div>
            </div>

        </section>
    );
}

export default MessageCards;
