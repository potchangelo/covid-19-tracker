import React from 'react';
import dayjs from 'dayjs';
import LoadingView from './_LoadingView';
import DetailsViewChart, { chartYMax } from './_DetailsViewChart';

const totalKeyArray = ['confirmed', 'recovered', 'deaths'];
const latestDays = 5;

function DetailsView(props) {
    // Props
    const { location, isLoading, onClickClose } = props;
    if (location === null) {
        if (!isLoading) return null;
        return (
            <div className="details-view">
                <div className="details-view__close" onClick={onClickClose}>
                    <span className="icon is-medium">
                        <i className="fas fa-times fa-lg"></i>
                    </span>
                </div>
                <div className="details-view__content">
                    <LoadingView 
                        isLoading={isLoading} 
                        extraClass="loading-view__side" />
                </div>
            </div>
        );
    };
    const { country, province, latest, timelines } = location;

    // Elements
    // 1. Text
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

    let textElement = (
        <div className="details-view__text">
            <h4 className="title is-4">{title}</h4>
            {totalElements}
        </div>
    );

    // 2. Bar chart
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
        const maxData = timelineArray[latestDays - 1].count;
        const yAxisMax = chartYMax(maxData);

        return (
            <React.Fragment key={key}>
                <h6 className={titleClass}>{_title}</h6>
                <p className="subtitle is-6">{`(Chart max = ${yAxisMax})`}</p>
                <DetailsViewChart
                    data={timelineArray}
                    maxData={maxData}
                    dataKey="count"
                    xAxisKey="dateStr"
                    mapKey={key} />
            </React.Fragment>
        );
    });

    let chartElement = (
        <div className="details-view__chart">
            <h4 className="title is-5">Latest {latestDays} days total</h4>
            {barChartElements}
        </div>
    );

    // 3. Loading
    if (isLoading) {
        textElement = null;
        chartElement = null;
    }

    return (
        <div className="details-view">
            <div className="details-view__close" onClick={onClickClose}>
                <span className="icon is-medium">
                    <i className="fas fa-times fa-lg"></i>
                </span>
            </div>
            <div className="details-view__content">
                {textElement}
                {chartElement}
                <LoadingView isLoading={isLoading} extraClass="loading-view__side" />
            </div>
        </div>
    );
}

export default DetailsView;