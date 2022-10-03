import { useState, useRef, useEffect } from 'react';
import { ChevronsRight, Filter, Info, RotateCcw } from 'react-feather';
import { useDispatch } from 'react-redux';
import LoadingView from './_LoadingView';
import { setError, unsetError } from '../redux/error/slice';
import { resetFilters } from '../redux/filters/slice';
import { MODAL_FILTER, MODAL_INFO } from '../redux/modal/name';
import { setModal } from '../redux/modal/slice';
import { useLocationsSelector } from '../redux/locations/selector';
import { getLocation, unsetSelectedLocation } from '../redux/locations/slice';
import './css/listView.scss';

const totalKeys = ['confirmed', 'recovered', 'deaths'];

function _ListView() {
  // Data
  const { locations, filteredLocations, selectedLocation, isLocationsLoading } = useLocationsSelector();
  const dispatch = useDispatch();
  const [isOnTablet, setIsOnTablet] = useState(false);
  const [isOnDesktop, setIsOnDesktop] = useState(true);
  const listLocationsRef = useRef(null);

  // Functions
  async function onClickItem(id) {
    setIsOnTablet(false);
    if (!selectedLocation || selectedLocation?.id !== id) {
      try {
        await dispatch(getLocation(id)).unwrap();
      } catch (error) {
        dispatch(setError(error));
      }
    } else {
      dispatch(unsetSelectedLocation());
    }
  }

  function onFilterOpenClick() {
    dispatch(setModal(MODAL_FILTER));
  }

  function onFilterResetClick() {
    dispatch(resetFilters());
    dispatch(unsetSelectedLocation());
    dispatch(unsetError());
  }

  function onInfoClick() {
    dispatch(setModal(MODAL_INFO));
  }

  function scrollToSelected(location) {
    if (!location) return;

    const parentBounds = listLocationsRef.current.getBoundingClientRect();
    const childNodesArray = Array.from(listLocationsRef.current.childNodes[1].childNodes);
    const selectedChild = childNodesArray.find(child => {
      return child.getAttribute('data-id') === `${location.id}`;
    });
    if (!selectedChild) return;

    const childBounds = selectedChild.getBoundingClientRect();

    const isExceedTop = childBounds.top < parentBounds.top;
    const isExceedBottom = childBounds.bottom > parentBounds.bottom;
    if (isExceedTop || isExceedBottom) {
      listLocationsRef.current.scrollTop = selectedChild.offsetTop - 20;
    }
  }

  // Effects
  useEffect(() => {
    scrollToSelected(selectedLocation);
  }, [selectedLocation]);

  // Elements
  // - Open / Close
  let listviewClass = 'list-view';
  let tabletIconClass = 'icon';
  let desktopIconClass = 'icon';
  if (isOnTablet) {
    listviewClass += ' is-on-tablet';
    tabletIconClass += ' is-rotate-180';
  }
  if (isOnDesktop) {
    listviewClass += ' is-on-desktop';
    desktopIconClass += ' is-rotate-180';
  }

  // - Total
  const totalDataElements = totalKeys.map(key => {
    const title = key.charAt(0).toUpperCase() + key.slice(1);
    const count = locations.reduce((sum, location) => {
      return sum + location.latest[key];
    }, 0);

    if (count === 0) return null;

    let titleClass = 'title is-6';
    if (key === 'recovered') titleClass += ' has-text-success';
    else if (key === 'deaths') titleClass += ' has-text-danger';

    return (
      <div key={key} className="columns is-mobile is-gapless mb-2">
        <div className="column">
          <b className={titleClass}>{title}</b>
        </div>
        <div className="column is-narrow">
          <span className="has-text-right">{count.toLocaleString('en')}</span>
        </div>
      </div>
    );
  });

  let totalElements = (
    <>
      <h5 className="title is-5 mb-4">Total</h5>
      {totalDataElements}
    </>
  );

  // - Filter
  let filterElements = (
    <div className="list-view__locations-filter">
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <button className="button is-small" onClick={onFilterOpenClick}>
            <span className="icon">
              <Filter size={14} />
            </span>
            <span>Filter</span>
          </button>
        </div>
        <div className="control">
          <button className="button is-small" onClick={onFilterResetClick}>
            <span className="icon">
              <RotateCcw size={14} />
            </span>
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );

  // - Locations
  const locationItemElements = filteredLocations.map(location => {
    const {
      id,
      country,
      country_code,
      province,
      latest: { confirmed },
    } = location;

    let title = country;
    if (province !== '' && province !== country) {
      title = `${province}, ${country}`;
    }
    let locationClass = 'list-view__location';
    if (!!selectedLocation) {
      if (location.id === selectedLocation.id) {
        locationClass += ' selected';
      }
    }

    return (
      <div key={`${id}-${country_code}`} className={locationClass} onClick={_ => onClickItem(id)} data-id={id}>
        <div className="columns is-mobile">
          <div className="column">
            <b className="title is-6">{title}</b>
          </div>
          <div className="column is-narrow">
            <span className="is-6 has-text-right">{confirmed.toLocaleString('en')}</span>
          </div>
        </div>
      </div>
    );
  });

  let locationElements = <div className="list-view__locations-data">{locationItemElements}</div>;

  // - Loading
  const loadingView = <LoadingView isShow={isLocationsLoading} extraClass="loading-view__side" />;
  if (isLocationsLoading) {
    totalElements = null;
    filterElements = null;
    locationElements = null;
  }

  return (
    <div className={listviewClass}>
      <div className="list-view__menu">
        <div
          className="list-view__menu-item list-view__switch is-hidden-desktop"
          onClick={_ => setIsOnTablet(prev => !prev)}
        >
          <span className={tabletIconClass}>
            <ChevronsRight size={18} />
          </span>
        </div>
        <div
          className="list-view__menu-item list-view__switch is-hidden-touch"
          onClick={_ => setIsOnDesktop(prev => !prev)}
        >
          <span className={desktopIconClass}>
            <ChevronsRight size={18} />
          </span>
        </div>
        <div className="list-view__menu-item" onClick={onInfoClick}>
          <span className="icon">
            <Info size={18} />
          </span>
        </div>
      </div>
      <div className="list-view__content">
        <div className="list-view__brand">
          <div>
            <div className="list-view__logo" />
          </div>
          <div>
            <h1 className="title is-6">COVID-19 Tracker</h1>
            <h3 className="subtitle is-7">by Zinglecode</h3>
          </div>
        </div>
        <div className="list-view__stat list-view__content-block">
          {loadingView}
          {totalElements}
        </div>
        <div className="list-view__locations list-view__content-block" ref={listLocationsRef}>
          {loadingView}
          {filterElements}
          {locationElements}
        </div>
      </div>
    </div>
  );
}

export default _ListView;
