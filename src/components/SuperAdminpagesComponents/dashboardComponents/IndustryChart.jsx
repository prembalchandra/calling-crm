import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const IndustryChart = () => {
    const teamNames = ["Industry 1", "Industry 2", "Industry 3", "Industry 4", "Industry 5"];
    const callsData = [50, 65, 40, 70, 80];
    const totalCalls = callsData.reduce((acc, val) => acc + val, 0);

    const [chartData] = useState({
        series: [
            {
                name: "Calls",
                data: callsData,
            },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 330,
                toolbar: { show: false },
            },
            colors: ["#5089a9"],
            fill: {
                type: "gradient",
                gradient: {
                    shade: 'dark',
                    type: "vertical",
                    stops: [0, 100],
                },
            },
            states: {
                hover: {
                    filter: { type: 'none' },
                },
            },
            xaxis: {
                categories: teamNames,
                labels: { style: { fontSize: '14px' } },
            },
            dataLabels: {
                enabled: true,
                style: { colors: ["#000"] },
            },
            tooltip: {
                enabled: true,
                theme: "light",
                y: {
                    formatter: (val) => `${val} Calls`,
                },
            },
            responsive: [
                {
                    breakpoint: 1024, 
                    options: {
                        chart: {
                            height: 280,
                        },
                        xaxis: {
                            labels: { style: { fontSize: '12px' } },
                        },
                        dataLabels: {
                            style: { fontSize: '12px' },
                        },
                    },
                },
                {
                    breakpoint: 768, 
                    options: {
                        chart: {
                            height: 250,
                        },
                        xaxis: {
                            labels: { style: { fontSize: '10px' } },
                        },
                        dataLabels: {
                            style: { fontSize: '10px' },
                        },
                    },
                },
            ],
        },
    });

    return (
        <div className="card-bg-wapper p-0 mt-0">
            <div className="card-header-body d-flex align-items-center justify-content-between p-3 mb-2">
                <div className="user-call-chat-heading">
                    <h2>Industry wise Employers Count</h2>
                </div>
                <div className="user-calll-total">
                    <h2 className="total-team" style={{ fontSize: '18px', color: '#2c74b3', margin: 0 }}>{totalCalls}</h2>
                </div>
            </div>
            <div className="user-call-chat-box">
                <div className="row">
                    <div className="col-12">
                        <Chart
                            options={chartData.options}
                            series={chartData.series}
                            type="bar"
                            height={chartData.options.chart.height}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndustryChart;
