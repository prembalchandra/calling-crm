import React from 'react';
import Breadcrumb from '../../MainComponents/breadcrumb/Breadcrumb'
import ProfileDetails from './ProfileDetails/ProfileDetails';
import RatingSummary from './RatingSummary/RatingSummary';
import InfoCards from './RatingSummary/InfoCards';
import TabsSection from './TabsSection/TabsSection';
import ReviewForm from './ReviewForm/ReviewForm'

function Employeeprofile() {
    return (
        <section className='main-content-area'>
             <Breadcrumb
                title="Employer Details"
                titleIcon="bx bx-group"
                buttons={[
                    
                ]}
            />
            <main className="main-content-arae">
                <section className="employee-inner-pages">

                    <div className="current-month-staff-col pt-3">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-4 mb-2">
                                <ProfileDetails />
                                <RatingSummary />
                            </div>

                            <div className="col-xl-8 col-lg-8 col-md-8">
                                <InfoCards />
                                <TabsSection />
                                <ReviewForm/>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </section>
    )
}
export default Employeeprofile