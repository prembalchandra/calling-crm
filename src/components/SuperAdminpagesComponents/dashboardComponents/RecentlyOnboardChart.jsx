import React from 'react';
import Chart from 'react-apexcharts';

const RecentlyOnboardChart = () => {
    const dataSeries = [44, 55, 13, 43];

    const total = dataSeries.reduce((a, b) => a + b, 0);

    const chartOptions = {
        chart: {
            type: 'pie',
            width: 220, // ✅ Updated from 240 to 220
        },
        labels: ['Recent Employer', 'Recent Caller', 'Recent Company', 'Recent User'],
        colors: ['#8a98b7', '#a6bdee', '#5089a9', '#2d739a'],
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '9px',
                fontWeight: 'bold',
                colors: ['#000'],
            },
        },
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            labels: {
                colors: '#000',
            },
            markers: {
                width: 12,
                height: 12,
                radius: 12,
            },
            formatter: function (seriesName, opts) {
                return `
          <span style="font-size: 13px; font-weight: 500; color: #000;">
            ${seriesName}: 
            <span style="margin-left: 10px;">
              ${opts.w.config.series[opts.seriesIndex]}
            </span>
          </span>`;
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'none',
                },
            },
        },
        responsive: [
            {
                breakpoint: 230,
                options: {
                    chart: {
                        width: 120,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    };

    return (
        <div className="card-bg-wapper p-0 mt-0">
            <div className="card-header-body d-flex align-items-center justify-content-between p-3 mb-2">
                <div className='user-call-chat-heading'>
                    <h2 style={{ margin: 0 }}>Recently Onboard</h2>
                </div>

                <h2 style={{ fontSize: '18px', color: '#2c74b3', margin: 0 }}>
                    Total: {total}
                </h2>
            </div>

            <div className="chart-area">
                <Chart options={chartOptions} series={dataSeries} type="pie" />
            </div>
        </div>
    );
};

export default RecentlyOnboardChart;
