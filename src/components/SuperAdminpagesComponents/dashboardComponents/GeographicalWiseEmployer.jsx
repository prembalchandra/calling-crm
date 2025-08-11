import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const GeographicalWiseEmployer = () => {
  const initialSeries = [500, 400, 300, 200];
  const labels = ['Bihar', 'U.P', 'Haryana', 'Delhi'];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const chartOptions = {
    chart: {
      width: 350,
      type: 'pie',
      events: {
        dataPointSelection: function (event, chartContext, config) {
          setSelectedIndex(config.dataPointIndex);
        },
      },
    },
    labels: labels,
    colors: ['#8a98b7', '#a6bdee', '#5089a9', '#2d739a'],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '9px',
        fontWeight: 'bold',
        colors: ['#000'],
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      labels: {
        colors: '#000',
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12,
      },
      formatter: function (seriesName, opts) {
        return `<span style="font-size: 13px; font-weight: 500; color: #000;">
          ${seriesName}:<span style="margin-left: 10px;">${opts.w.config.series[opts.seriesIndex]}</span>
        </span>`;
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 280,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div className="card-bg-wapper p-0">
      <div className="card-header-body d-flex align-items-center justify-content-between p-3 mb-2">
        <div className="user-call-chat-heading">
          <h2 style={{ margin: 0 }}>Geographical Wise Employer</h2>
        </div>
        <div className="user-calll-total">
          <h2 className="total-team" style={{ fontSize: '18px', color: '#2c74b3', margin: 0 }}>
            {labels[selectedIndex]}: {initialSeries[selectedIndex]}
          </h2>
        </div>
      </div>

      <div className="chart-area">
        <Chart
          options={chartOptions}
          series={initialSeries}
          type="pie"
          width="100%"
        />
      </div>
    </div>
  );
};

export default GeographicalWiseEmployer;
