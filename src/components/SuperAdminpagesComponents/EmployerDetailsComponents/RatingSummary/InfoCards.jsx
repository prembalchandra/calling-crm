import React from 'react';


const cardData = [
  { label: 'Total Calls', value: 64 },
  { label: 'Total Product', value: 23 },
  { label: 'Total Call Time', value: '3h 42m' },
  { label: 'Total Generated Leads', value: 17 },
  { label: 'Leads Conversion Ratio', value: '26%' }
];

const InfoCards = () => {
  return (
    <div className="row row-sm">
      {cardData.map((item, idx) => (
        <div
          key={idx}
          className={`col-sm-12 col-xl-${idx > 2 ? '5' : '4'} col-lg-6 col-md-6 mb-3`}
        >
          <div className="current-month-staff-col card-bg-callbox">
            <div
              className={`counter-status d-flex md-mb-0 card`}
             
            >
              <div className="detail-transparent-pricing">
                <div className="rupee-value">
                  <p className="rupee"><i className="bx bx-phone"></i></p>
                  <p className="value">{item.value}</p>
                </div>
                <div className="tps-content">
                  <p>{item.label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;
