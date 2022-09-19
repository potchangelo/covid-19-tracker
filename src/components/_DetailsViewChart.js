import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const barColor = {
  light: {
    confirmed: 'hsl(0, 0%, 14%)',
    recovered: 'hsl(141, 53%, 53%)',
    deaths: 'hsl(348, 86%, 61%)',
  },
  dark: {
    confirmed: 'hsl(0, 0%, 93%)',
    recovered: 'hsl(141, 53%, 53%)',
    deaths: 'hsl(348, 86%, 61%)',
  },
};

/**
 * @param {string} caseType
 * @param {string} theme
 */
function getChartStyles(caseType, theme) {
  return {
    barColor: barColor[theme][caseType],
    gridColor: theme === 'dark' ? 'hsl(0, 0%, 71%)' : 'hsl(0, 0%, 48%)',
    ticksColor: theme === 'dark' ? 'hsl(0, 0%, 86%)' : 'hsl(0, 0%, 21%)',
  };
}

/**
 * @param {number} y
 */
function getChartYMaxTick(y) {
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
function getChartYTickLabel(y) {
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

/**
 * @param {object} props
 * @param {{ x: string, y: number }} props.data
 * @param {number} props.dataYMax
 * @param {string} props.caseType
 */
function _DetailsViewChart(props) {
  const { data, dataYMax, caseType } = props;
  const [theme, setTheme] = useState('light');

  function onThemeChange() {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const newTheme = mql.matches ? 'dark' : 'light';
    setTheme(newTheme);
  }

  useEffect(() => {
    onThemeChange();
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (!!mql.addEventListener) {
      mql.addEventListener('change', onThemeChange);
    } else {
      mql.addListener(onThemeChange);
    }
    return () => {
      if (!!mql.addEventListener) {
        mql.removeEventListener('change', onThemeChange);
      } else {
        mql.removeListener(onThemeChange);
      }
    };
  }, []);

  const chartStyles = getChartStyles(caseType, theme);
  const chartYMaxTick = getChartYMaxTick(dataYMax);

  return (
    <Bar
      data={{
        datasets: [
          {
            data,
            backgroundColor: chartStyles.barColor,
            barPercentage: 0.55,
          },
        ],
      }}
      options={{
        aspectRatio: 1.7,
        scales: {
          x: {
            grid: {
              borderColor: chartStyles.gridColor,
              display: false,
            },
            ticks: {
              color: chartStyles.ticksColor,
              font: { family: 'Open Sans', size: 10 },
            },
          },
          y: {
            grid: {
              color: chartStyles.gridColor,
              borderColor: chartStyles.gridColor,
              borderDash: [4, 4],
            },
            ticks: {
              callback: value => getChartYTickLabel(value),
              color: chartStyles.ticksColor,
              font: { family: 'Open Sans', size: 10 },
              stepSize: chartYMaxTick / 4,
            },
            min: 0,
            max: chartYMaxTick,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            titleColor: 'hsl(0, 0%, 21%)',
            bodyColor: 'hsl(0, 0%, 21%)',
            backgroundColor: 'hsl(48, 100%, 67%)',
            borderColor: 'hsl(0, 0%, 48%)',
            borderWidth: 3,
          },
        },
      }}
    />
  );
}

export default _DetailsViewChart;
export { getChartYMaxTick };
