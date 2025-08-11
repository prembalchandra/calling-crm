import React from 'react';

function Dailytracker() {
    return (
        <div className="team-working-card-box">
            <div className='card-header-body d-flex align-items-center justify-content-between p-3'>
                <div className='user-call-chat-heading'>
                    <h2>Top Working Team</h2>
                </div>
            </div>
            <div className="user-call-chat-box">
                <div className="table-responsive custom-table">
                    <table className="table table-bordered mb-0">
                        <tbody>
                            <tr><td className='table-tema'>Interested</td><td className='table-tema-numer'>52</td></tr>
                            <tr><td className='table-tema'>Call Back</td><td className='table-tema-numer'>20</td></tr>
                            <tr><td className='table-tema'>Sales Closed</td><td className='table-tema-numer'>50</td></tr>
                            <tr><td className='table-tema'>Not Interested</td><td className='table-tema-numer'>50</td></tr>
                            <tr><td className='table-tema'>Followup</td><td className='table-tema-numer'>30</td></tr>
                            <tr><td className='table-tema'>Appointment Fixed</td><td className='table-tema-numer'>40</td></tr>
                            <tr><td className='table-tema'>Not Connected</td><td className='table-tema-numer'>40</td></tr>
                            <tr><td className='table-tema'>Sales Closed</td><td className='table-tema-numer'>40</td></tr>
                            <tr><td className='table-tema'>Wrong Number</td><td className='table-tema-numer'>20</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dailytracker;
