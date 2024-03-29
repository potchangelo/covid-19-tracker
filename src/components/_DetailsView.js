import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import { X } from 'react-feather';
import { useDispatch } from 'react-redux';
import LoadingView from './_LoadingView';
import DetailsViewChart, { getChartYMaxTick } from './_DetailsViewChart';
import { useLocationsSelector } from '../redux/locations/selector';
import { unsetSelectedLocation } from '../redux/locations/slice';
import './css/detailsView.scss';

const totalKeys = ['confirmed', 'recovered', 'deaths'];
const latestDays = 5;

function _DetailsView() {
  // Data
  const { selectedLocation: location, isSelectedLocationLoading: isLoading } = useLocationsSelector();
  const dispatch = useDispatch();
  const [isOnTablet, setIsOnTablet] = useState(false);

  // Effects
  useEffect(() => {
    if (!location) setIsOnTablet(false);
  }, [location]);

  // Empty view conditions
  if (!location) {
    if (!isLoading) return null;
    return (
      <div className="details-view">
        <div className="details-view__close" onClick={_ => dispatch(unsetSelectedLocation())}>
          <span className="icon is-medium">
            <X />
          </span>
        </div>
        <div className="details-view__content">
          <LoadingView isShow={isLoading} extraClass="loading-view__side" />
        </div>
      </div>
    );
  }

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

  const totalElements = totalKeys.map(key => {
    const _title = key.charAt(0).toUpperCase() + key.slice(1);
    const count = latest[`${key}`];

    if (count === 0) return null;

    let titleClass = 'title is-6';
    if (key === 'recovered') titleClass += ' has-text-success';
    else if (key === 'deaths') titleClass += ' has-text-danger';

    return (
      <div key={key} className="columns is-mobile is-gapless mb-2">
        <div className="column">
          <b className={titleClass}>{_title}</b>
        </div>
        <div className="column is-narrow">
          <span className="has-text-right">{count.toLocaleString('en')}</span>
        </div>
      </div>
    );
  });

  let textElement = (
    <div className="details-view__text details-view__content-block">
      <h5 className="title is-5 mb-4">{title}</h5>
      {totalElements}
    </div>
  );

  // - Bar chart
  const barChartElements = totalKeys.map(caseType => {
    const { timeline } = timelines[caseType];
    /**
     * @type [[string, number]]
     */
    const timelineEntries = Object.entries(timeline);
    if (timelineEntries.length < latestDays) return null;

    // Title
    const _title = caseType.charAt(0).toUpperCase() + caseType.slice(1);
    let titleClass = 'title is-6';
    if (caseType === 'recovered') titleClass += ' has-text-success';
    else if (caseType === 'deaths') titleClass += ' has-text-danger';

    // Bar chart
    let timelineObjects = timelineEntries.map(([dateStr, count]) => {
      return { date: dayjs(dateStr), count };
    });
    timelineObjects.sort((tl1, tl2) => {
      return tl1.date.isBefore(tl2.date) ? -1 : 1;
    });
    const chartData = timelineObjects
      .map(({ date, count }) => {
        return { x: date.format('MMM D'), y: count };
      })
      .filter((_, index) => {
        return timelineObjects.length - index <= latestDays;
      });

    const chartDataYMax = chartData[latestDays - 1].y;
    const chartDataYMaxTick = getChartYMaxTick(chartDataYMax);

    if (chartDataYMax === 0) return null;

    return (
      <React.Fragment key={caseType}>
        <h6 className={titleClass}>{_title}</h6>
        <p className="subtitle is-6">{`(Chart max = ${chartDataYMaxTick.toLocaleString('en')})`}</p>
        <div className="mb-5">
          <DetailsViewChart data={chartData} dataYMax={chartDataYMax} caseType={caseType} />
        </div>
      </React.Fragment>
    );
  });

  let chartElement = (
    <div className="details-view__chart details-view__content-block">
      <h5 className="title is-5">Latest {latestDays} days total</h5>
      {barChartElements}
    </div>
  );

  // - More
  let moreElement = (
    <div className="details-view__more details-view__content-block has-text-centered">
      <button className="button is-link is-outlined is-small" onClick={_ => setIsOnTablet(prev => !prev)}>
        {isOnTablet ? 'SHOW LESS' : 'SHOW MORE'}
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
      <div className="details-view__close" onClick={_ => dispatch(unsetSelectedLocation())}>
        <span className="icon is-medium">
          <X />
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

export default _DetailsView;
