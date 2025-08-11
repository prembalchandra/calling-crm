import React, { useEffect, useState } from 'react';
import Bredbrcumb from './Bredbrcumb';
import './Dashbord.css';
import IndustryChart from './IndustryChart';
import RecentlyOnboardChart from './RecentlyOnboardChart';
import GeographicalWiseEmployer from './GeographicalWiseEmployer'
import ProfileDetails from './ProfileDetails';
import CardList from './CardList';
import { topEmployers, topCallers, hotLeads } from './data/TopEmployers';

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

        {/* Industry Chart */}
        <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4'>
          <div className="row-bg p-0">
            <IndustryChart />
          </div>
        </div>

        {/* Recently Onboard Chart */}
        <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4'>
          <div className="row-bg p-0">
            <RecentlyOnboardChart />
          </div>
        </div>
        {/* Repeat chart or use other component if needed */}
        <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4'>
          <div className="row-bg p-0">
            <GeographicalWiseEmployer />
          </div>
        </div>
        {/* Top Employers */}
        <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4'>
          <div className="row-bg p-0">
            <CardList title="Top Employers by Caller Count" data={topEmployers} type="employer" />
          </div>
        </div>

        {/* Top Callers */}
        <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4'>
          <div className="row-bg p-0">
            <CardList title="Top Caller" data={topCallers} type="caller" />
          </div>
        </div>

        {/* Hot Lead Tracker */}
        <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4'>
          <div className="row-bg p-0">
            <CardList title="Hot Lead Tracker" data={hotLeads} type="hotlead" />
          </div>
        </div>



      </div>

      {/* Profile Slide */}
      <div className={`profile-slide ${showProfile ? 'open' : ''}`}>
        <ProfileDetails />
      </div>
    </section>
  );
};

export default Dashboard;
