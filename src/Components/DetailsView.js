import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import dayjs from 'dayjs';

const totalKeyArray = ['confirmed', 'recovered', 'deaths'];

const latestDays = 5;
const chartOptions = {
    count: 5,
    height: 220,
    margin: { top: 5, right: 0, bottom: 20, left: 0 },
    line: { stroke: '#B5B5B5' },
    tick: { fill: '#4A4A4A', fontSize: 10 },
    cursor: { fill: '#B5B5B5', fillOpacity: 0.2 },
    tooltipStyle: { fontSize: 12 },
    barColor: { confirmed: '#363636', recovered: '#23D160', deaths: '#FF3860' }
};

function chartXAxisFormatter(date) {
    return dayjs(date).format('MMM D');
}

function chartYMax(number) {
    if (number > 1e5) return 5e5;
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
    if (payload !== undefined && payload !== null) {
        if (payload.length > 0) value = payload[0].value;
    }
    return (
        <div className="barchart-tooltip">
            <b>{value}</b>
        </div>
    );
}

function DetailsView(props) {
    // Props
    const {
        location: { country, province, latest, timelines },
        onClickClose
    } = props;

    // Elements
    let title = country;
    if (province !== '' && province !== country) {
        title = `${province}, ${country}`;
    }
    const totalElements = totalKeyArray.map(key => {
        const _title = key.charAt(0).toUpperCase() + key.slice(1);
        const count = latest[`${key}`];

        let titleClass = 'title is-6';
        if (key === 'recovered') titleClass += ' has-text-success';
        else if (key === 'deaths') titleClass += ' has-text-danger';

        return (
            <div key={key} className="columns is-mobile">
                <div className="column is-8">
                    <h6 className={titleClass}>{_title}</h6>
                </div>
                <div className="column">
                    <p className="is-6 has-text-right">{count.toLocaleString('en')}</p>
                </div>
            </div>
        );
    });

    const barChartElements = totalKeyArray.map(key => {
        // If timeline empty, return nothing
        const { timeline } = timelines[key];
        let timelineArray = Object.entries(timeline);
        if (timelineArray.length < latestDays) {
            return <React.Fragment key={key}></React.Fragment>
        }

        // Title
        const _title = key.charAt(0).toUpperCase() + key.slice(1);
        let titleClass = 'title is-6';
        if (key === 'recovered') titleClass += ' has-text-success';
        else if (key === 'deaths') titleClass += ' has-text-danger';

        // Bar chart
        timelineArray = timelineArray.map(([dateStr, count]) => {
            return { dateStr, count };
        });
        timelineArray.sort((dateStr1, dateStr2) => {
            return (dayjs(dateStr1).isAfter(dayjs(dateStr2))) ? 1 : -1;
        });
        timelineArray = timelineArray.filter((_, index) => {
            return timelineArray.length - index <= latestDays;
        });

        const lastCount = timelineArray[latestDays - 1].count
        const yAxisMax = chartYMax(lastCount);
        const yAxisTicks = chartYTicks(lastCount);

        const barChart = (
            <ResponsiveContainer 
                width="100%" 
                height={chartOptions.height}>
                <BarChart 
                    data={timelineArray} 
                    margin={chartOptions.margin} 
                    barCategoryGap="30%">
                    <CartesianGrid 
                        vertical={false} 
                        strokeDasharray="4 4" />
                    <XAxis 
                        dataKey="dateStr" 
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
                        dataKey="count" 
                        fill={chartOptions.barColor[key]} />
                </BarChart>
            </ResponsiveContainer>
        );

        

        return (
            <React.Fragment key={key}>
                <h6 className={titleClass}>{_title}</h6>
                <p className="subtitle is-6">{`(Chart max = ${yAxisMax})`}</p>
                {barChart}
            </React.Fragment>
        );
    });

    return (
        <div className="details-view">
            <div className="details-view__close" onClick={onClickClose}>
                <span className="icon is-medium">
                    <i className="fas fa-times fa-lg"></i>
                </span>
            </div>
            <div className="details-view__content">
                <div className="details-view__text">
                    <h4 className="title is-4">{title}</h4>
                    {totalElements}
                </div>
                <div className="details-view__graph">
                    <h4 className="title is-5">Latest {latestDays} days total</h4>
                    {barChartElements}
                </div>
            </div>
        </div>
    );
}

export default DetailsView;