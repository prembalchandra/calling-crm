import React from 'react';
import Chart from 'react-apexcharts';

const Teamwoking = () => {
    const dataValues = [50, 65, 40, 70, 80];
    const totalCount = dataValues.reduce((total, value) => total + value, 0);

    const chartOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                distributed: true,
                horizontal: false,
                columnWidth: '55%',
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
            },
        },
        xaxis: {
            categories: ['Team1', 'Team 2', 'Team 3', 'Taem 4', 'Team 5'],
        },
        yaxis: {
            min: 0,
            max: 100,
        },
        colors: ['#26a19f'],
        legend: {
            show: false,
        },
    };

    const chartSeries = [
        {
            name: 'Team Score',
            data: dataValues,
        },
    ];

    return (
        <div className="team-working-card-box">
            <div className='card-header-body d-flex align-items-center justify-content-between p-3 mb-2'>
                <div className='user-call-chat-heading'>
                    <h2>Top Working Team</h2>
                </div>

                <div className='user-calll-total'>
                    <span className='total-team'>Total Team:   
                        <span style={{ fontSize: '18px', color: '#2c74b3', margin: 0  }} className='ps-2'>{totalCount}</span></span>
                </div>

            </div>
            <Chart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={350}
            />
        </div>
    );
};

export default Teamwoking;
