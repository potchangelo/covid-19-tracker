import './Css/DetailsView.scss';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import LoadingView from './_LoadingView';
import DetailsViewChart, { chartYMax } from './_DetailsViewChart';

const totalKeyArray = ['confirmed', 'recovered', 'deaths'];
const latestDays = 5;

function DetailsView(props) {
    // Props, States
    const { location, isLoading, onClickClose } = props;
    const [isOnTablet, setIsOnTablet] = useState(false);

    // Effects
    useEffect(() => {
        if (location === null) setIsOnTablet(false);
    }, [location]);

    // Empty view conditions
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
                        isShow={isLoading} 
                        extraClass="loading-view__side" />
                </div>
            </div>
        );
    };

    // Elements
    const { country, province, latest, timelines } = location;

    // - Class
    let detailsClass = 'details-view';
    if (isOnTablet) detailsClass += ' is-on-tablet';

    // - Text
    let title = country;
    if (province !== '' && province !== country) {
        title = `${province}, ${country}`;
    }

    const totalElements = totalKeyArray.map(key => {
        const _title = key.charAt(0).toUpperCase() + key.slice(1);
        const count = latest[`${key}`];

        if (count === 0) return null;

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
        <div className="details-view__text details-view__content-block">
            <h4 className="title is-4">{title}</h4>
            {totalElements}
        </div>
    );

    // - Bar chart
    const barChartElements = totalKeyArray.map(key => {
        const { timeline } = timelines[key];
        let timelineArray = Object.entries(timeline);

        if (timelineArray.length < latestDays) return null;

        // Title
        const _title = key.charAt(0).toUpperCase() + key.slice(1);
        let titleClass = 'title is-6';
        if (key === 'recovered') titleClass += ' has-text-success';
        else if (key === 'deaths') titleClass += ' has-text-danger';

        // Bar chart
        timelineArray = timelineArray.map(([dateStr, count]) => {
            return { dateStr, count };
        });
        timelineArray.sort((time1, time2) => {
            const date1 = dayjs(time1.dateStr);
            const date2 = dayjs(time2.dateStr);
            return (date1.isBefore(date2)) ? -1 : 1;
        });
        timelineArray = timelineArray.filter((_, index) => {
            return timelineArray.length - index <= latestDays;
        });
        
        const maxData = timelineArray[latestDays - 1].count;
        const yAxisMax = chartYMax(maxData);

        if (maxData === 0) return null;

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
        <div className="details-view__chart details-view__content-block">
            <h4 className="title is-5">Latest {latestDays} days total</h4>
            {barChartElements}
        </div>
    );

    // - More
    let moreElement = (
        <div className="details-view__more details-view__content-block has-text-centered">
            <button 
                className="button is-link is-outlined is-small"
                onClick={_ => setIsOnTablet(prev => !prev)}>
                {(isOnTablet) ? 'SHOW LESS': 'SHOW MORE'}
            </button>
        </div>
    );

    // - Loading
    if (isLoading) {
        textElement = null;
        chartElement = null;
        moreElement = null;
    }

    return (
        <div className={detailsClass}>
            <div className="details-view__close" onClick={onClickClose}>
                <span className="icon is-medium">
                    <i className="fas fa-times fa-lg"></i>
                </span>
            </div>
            <div className="details-view__content">
                {textElement}
                {chartElement}
                {moreElement}
                <LoadingView isShow={isLoading} extraClass="loading-view__side" />
            </div>
        </div>
    );
}

export default DetailsView;