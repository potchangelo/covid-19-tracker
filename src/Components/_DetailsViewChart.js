import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import dayjs from 'dayjs';

const chartSharedOptions = {
    height: 220,
    margin: { top: 5, right: 0, bottom: 20, left: 0 },
    tooltipStyle: { fontSize: 12 },
};

const chartLightThemeOptions = {
    dashColor: 'hsl(0, 0%, 71%)',
    line: { stroke: 'hsl(0, 0%, 71%)' },
    tick: { fill: 'hsl(0, 0%, 21%)', fontSize: 10 },
    cursor: { fill: 'hsl(0, 0%, 71%)', fillOpacity: 0.2 },
    barColor: { confirmed: 'hsl(0, 0%, 14%)', recovered: 'hsl(141, 53%, 53%)', deaths: 'hsl(348, 86%, 61%)' }
}

const chartDarkThemeOptions = {
    dashColor: 'hsl(0, 0%, 48%)',
    line: { stroke: 'hsl(0, 0%, 48%)' },
    tick: { fill: 'hsl(0, 0%, 86%)', fontSize: 10 },
    cursor: { fill: 'hsl(0, 0%, 48%)', fillOpacity: 0.2 },
    barColor: { confirmed: 'hsl(0, 0%, 93%)', recovered: 'hsl(141, 53%, 53%)', deaths: 'hsl(348, 86%, 61%)' }
}

function chartXAxisFormatter(date) {
    return dayjs(date).format('MMM D');
}

function chartYMax(number) {
    if (number > 5e8) return 1e9;
    else if (number > 1e8) return 5e8;
    else if (number > 5e7) return 1e8;
    else if (number > 1e7) return 5e7;
    else if (number > 5e6) return 1e7;
    else if (number > 1e6) return 5e6;
    else if (number > 5e5) return 1e6;
    else if (number > 1e5) return 5e5;
    else if (number > 5e4) return 1e5;
    else if (number > 1e4) return 5e4;
    else if (number > 5e3) return 1e4;
    else if (number > 1e3) return 5e3;
    else if (number > 5e2) return 1e3;
    else if (number > 1e2) return 5e2;
    return 1e2;
}

function chartYTicks(number) {
    const max = chartYMax(number);
    return [0, 1, 2, 3, 4].map(i => max * i / 4);
}

function chartYAxisFormatter(number) {
    let fixed = 0;
    if (number >= 1e9) {
        if (number % 1e9 !== 0) fixed = 1;
        if (number % 1e8 !== 0) fixed = 2;
        return (number / 1e9).toFixed(fixed) + 'B';
    } 
    else if (number >= 1e6) {
        if (number % 1e6 !== 0) fixed = 1;
        if (number % 1e5 !== 0) fixed = 2;
        return (number / 1e6).toFixed(fixed) + 'M';
    } 
    else if (number >= 1e3) {
        if (number % 1e3 !== 0) fixed = 1;
        if (number % 1e2 !== 0) fixed = 2;
        return (number / 1e3).toFixed(fixed) + 'K';
    } 
    else {
        return number.toFixed();
    }
}

function ChartTooltip(props) {
    const { payload } = props;
    let value = null;
    if (payload?.length > 0) {
        value = payload[0].value.toLocaleString('en');
    }
    return (
        <div className="details-view__chart-tooltip">
            <b>{value}</b>
        </div>
    );
}

function DetailsViewChart(props) {
    const { data, maxData, dataKey, xAxisKey, mapKey } = props;
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
        }
        else {
            mql.addListener(onThemeChange);
        }
        return () => {
            if (!!mql.addEventListener) {
                mql.removeEventListener('change', onThemeChange);
            }
            else {
                mql.removeListener(onThemeChange);
            }
        }
    }, []);
    
    let chartOptions;
    if (theme === 'dark') {
        chartOptions = Object.assign(
            {}, chartSharedOptions, chartDarkThemeOptions
        );
    }
    else {
        chartOptions = Object.assign(
            {}, chartSharedOptions, chartLightThemeOptions
        );
    }
    const yAxisMax = chartYMax(maxData);
    const yAxisTicks = chartYTicks(maxData);

    return (
        <ResponsiveContainer
            width="100%"
            height={chartOptions.height}>
            <BarChart
                data={data}
                margin={chartOptions.margin}
                barCategoryGap="30%">
                <CartesianGrid
                    vertical={false}
                    strokeDasharray="4 4" 
                    stroke={chartOptions.dashColor} />
                <XAxis
                    dataKey={xAxisKey}
                    axisLine={chartOptions.line}
                    tick={chartOptions.tick}
                    tickLine={chartOptions.line}
                    tickFormatter={chartXAxisFormatter} />
                <YAxis
                    type="number"
                    domain={[0, yAxisMax]}
                    interval={0}
                    width={36}
                    axisLine={chartOptions.line}
                    ticks={yAxisTicks}
                    tick={chartOptions.tick}
                    tickLine={chartOptions.line}
                    tickFormatter={chartYAxisFormatter} />
                <Tooltip
                    content={<ChartTooltip />}
                    cursor={chartOptions.cursor}
                    labelStyle={chartOptions.tooltipStyle}
                    contentStyle={chartOptions.tooltipStyle} />
                <Bar
                    dataKey={dataKey}
                    fill={chartOptions.barColor[mapKey]} />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default DetailsViewChart;
export { chartYMax }