
import React from 'react';

const CardList = ({ title, data, type }) => (
  <div className="current-month-staff-col card-bg-warrper">
    <div className="card-body-box">
      <div className="card-header-body d-flex align-items-center justify-content-between p-2 mb-2">
        <div className="card-header-row user-call-chat-heading">
          <h2 className="card-heading-4">{title}</h2>
        </div>
      </div>
      <div className="card-employer-arae">
        <div className="card-employer-row">
          {data.map((item, index) => (
            <div className="card-employer-col" key={index}>
              <div className="card-employer-lift-arae d-flex gap-1 flex-column">
                <h5 className="employer-name-inner employer-name-heading">{item.name}</h5>
                {item.email && <p className="fs-6">{item.email}</p>}
              </div>
              <div className="card-employer-right-arae">
                <h5 className="employer-name-inner employer-name-heading">
                  {type === 'hotlead' ? item.industry : `${item.count} count`}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default CardList;
