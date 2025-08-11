


import React, { useEffect, useState } from 'react';
import Teamwoking from './Teamwoking';
import Dailytracker from './Dailytracker';
import Bredbrcumb from './Bredbrcumb';
import ProfileDetails from '../../MainComponents/ProfileDetails/ProfileDetails';
import './Dashboard.css';


 
const Dashboard = () => {
   const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowProfile(true);
    }, 500);
  }, []);
  return (
   <section className='main-content-area'>
      <div className="company-detail-box card-bg-wapper mb-4">
        <Bredbrcumb />
      </div>

      <div className='row'>
        <div className='col-lg-6 col-md-6'>
          <div className="row-bg p-0">
            <Dailytracker />
          </div>
        </div>

        <div className='col-lg-6 col-md-6'>
          <div className="row-bg p-0">
            <Teamwoking />
          </div>
        </div>
      </div>

      {/* Slide-in Profile Form */}
      <div className={`profile-slide ${showProfile ? 'open' : ''}`}>
        <ProfileDetails />
      </div>
    </section>
  );
};

export default Dashboard;
