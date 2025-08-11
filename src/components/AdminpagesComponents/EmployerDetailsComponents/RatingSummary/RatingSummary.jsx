import React from 'react';

const RatingSummary = () => {
  const ratings = [
    { stars: '★★★★★', value: 2, percent: 50 },
    { stars: '★★★★☆', value: 1, percent: 25 },
    { stars: '★★★☆☆', value: 0, percent: 0 },
    { stars: '★★☆☆☆', value: 1, percent: 25 },
    { stars: '★☆☆☆☆', value: 0, percent: 0 }
  ];

  return (
    <div className="row-bg  mt-3">
      <div className="rating-summary">
        <h5>Overall Rating</h5>
        <div className="stars">
          <i className="bx bxs-star"></i>
          <i className="bx bxs-star"></i>
          <i className="bx bxs-star"></i>
          <i className="bx bxs-star"></i>
          <i className="bx bx-star"></i>
        </div>
        <p className="text-muted">(4.0/5)</p>
        <h6 className="fs-6 pt-2">4 Ratings</h6>

        <div className="progressBarWrapper mt-4">
          {ratings.map((item, index) => (
            <div className="progressBarItem mt-2" key={index}>
              <div className="progressLabel">
                <span>{item.stars}</span> {item.value} ({item.percent}%)
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  style={{ width: `${item.percent}%`, backgroundColor: '#ffcc00' }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingSummary;
