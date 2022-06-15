import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
// import dayjs from 'dayjs';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const chartSharedOptions = {
//   height: 220,
//   margin: { top: 5, right: 0, bottom: 20, left: 0 },
//   tooltipStyle: { fontSize: 12 },
// };

// const chartLightThemeOptions = {
//   dashColor: 'hsl(0, 0%, 71%)',
//   line: { stroke: 'hsl(0, 0%, 71%)' },
//   tick: { fill: 'hsl(0, 0%, 21%)', fontSize: 10 },
//   cursor: { fill: 'hsl(0, 0%, 71%)', fillOpacity: 0.2 },
//   barColor: {
//     confirmed: 'hsl(0, 0%, 14%)',
//     recovered: 'hsl(141, 53%, 53%)',
//     deaths: 'hsl(348, 86%, 61%)',
//   },
// };

// const chartDarkThemeOptions = {
//   dashColor: 'hsl(0, 0%, 48%)',
//   line: { stroke: 'hsl(0, 0%, 48%)' },
//   tick: { fill: 'hsl(0, 0%, 86%)', fontSize: 10 },
//   cursor: { fill: 'hsl(0, 0%, 48%)', fillOpacity: 0.2 },
//   barColor: {
//     confirmed: 'hsl(0, 0%, 93%)',
//     recovered: 'hsl(141, 53%, 53%)',
//     deaths: 'hsl(348, 86%, 61%)',
//   },
// };

/**
 * @param {number} y
 */
function chartYMax(y) {
  if (y > 5e8) return 1e9;
  else if (y > 1e8) return 5e8;
  else if (y > 5e7) return 1e8;
  else if (y > 1e7) return 5e7;
  else if (y > 5e6) return 1e7;
  else if (y > 1e6) return 5e6;
  else if (y > 5e5) return 1e6;
  else if (y > 1e5) return 5e5;
  else if (y > 5e4) return 1e5;
  else if (y > 1e4) return 5e4;
  else if (y > 5e3) return 1e4;
  else if (y > 1e3) return 5e3;
  else if (y > 5e2) return 1e3;
  else if (y > 1e2) return 5e2;
  return 1e2;
}

/**
 * @param {number} y
 */
function chartYTicks(y) {
  const max = chartYMax(y);
  return [0, 1, 2, 3, 4].map(i => (max * i) / 4);
}

/**
 * @param {number} y
 */
function chartYTickLabel(y) {
  let fixed = 0;
  if (y >= 1e9) {
    if (y % 1e9 !== 0) fixed = 1;
    if (y % 1e8 !== 0) fixed = 2;
    return (y / 1e9).toFixed(fixed) + 'B';
  } else if (y >= 1e6) {
    if (y % 1e6 !== 0) fixed = 1;
    if (y % 1e5 !== 0) fixed = 2;
    return (y / 1e6).toFixed(fixed) + 'M';
  } else if (y >= 1e3) {
    if (y % 1e3 !== 0) fixed = 1;
    if (y % 1e2 !== 0) fixed = 2;
    return (y / 1e3).toFixed(fixed) + 'K';
  } else {
    return y.toFixed();
  }
}

// function ChartTooltip(props) {
//   const { payload } = props;
//   let value = null;
//   if (payload?.length > 0) {
//     value = payload[0].value.toLocaleString('en');
//   }
//   return (
//     <div className="details-view__chart-tooltip">
//       <b>{value}</b>
//     </div>
//   );
// }

/**
 * @param {object} props
 * @param {{ x: string, y: number }} props.data
 * @param {number} props.dataYMax
 */
function DetailsViewChart(props) {
  // const { data, maxData, dataKey, xAxisKey, mapKey } = props;
  const { data, dataYMax } = props;
  // const [theme, setTheme] = useState('light');

  // function onThemeChange() {
  //   const mql = window.matchMedia('(prefers-color-scheme: dark)');
  //   const newTheme = mql.matches ? 'dark' : 'light';
  //   setTheme(newTheme);
  // }

  // useEffect(() => {
  //   onThemeChange();
  //   const mql = window.matchMedia('(prefers-color-scheme: dark)');
  //   if (!!mql.addEventListener) {
  //     mql.addEventListener('change', onThemeChange);
  //   } else {
  //     mql.addListener(onThemeChange);
  //   }
  //   return () => {
  //     if (!!mql.addEventListener) {
  //       mql.removeEventListener('change', onThemeChange);
  //     } else {
  //       mql.removeListener(onThemeChange);
  //     }
  //   };
  // }, []);

  // let chartOptions;
  // if (theme === 'dark') {
  //   chartOptions = Object.assign({}, chartSharedOptions, chartDarkThemeOptions);
  // } else {
  //   chartOptions = Object.assign({}, chartSharedOptions, chartLightThemeOptions);
  // }
  // const yAxisMax = chartYMax(maxData);
  // const yAxisTicks = chartYTicks(maxData);

  const chartYMaxTick = chartYMax(dataYMax);

  return (
    <Bar
      data={{
        datasets: [{
          data,
          backgroundColor: 'hsl(348, 86%, 61%)',
          barPercentage: 0.55,
        }]
      }}
      options={{
        scales: {
          x: {
            grid: {
              borderColor: 'hsl(0, 0%, 71%)',
              display: false
            },
            ticks: { font: { size: 10 } }
          },
          y: {
            grid: {
              color: 'hsl(0, 0%, 71%)',
              borderColor: 'hsl(0, 0%, 71%)',
              borderDash: [4, 4],
            },
            ticks: {
              callback: value => chartYTickLabel(value),
              font: { size: 10 },
              stepSize: chartYMaxTick / 4
            },
            min: 0,
            max: chartYMaxTick,
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }}
    />
  );
}

export default DetailsViewChart;
export { chartYMax };
