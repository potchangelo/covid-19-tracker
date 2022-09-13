import { useState, useRef, useEffect } from 'react';
import LoadingView from './_LoadingView';
import { MODAL_FILTER, MODAL_INFO } from '../redux/modal/name';
import './css/listView.scss';
import { useLocationsSelector } from '../redux/locations/selector';
import { useDispatch } from 'react-redux';
import { setModal } from '../redux/modal/slice';
import { resetFilters } from '../redux/filters/slice';

const totalKeys = ['confirmed', 'recovered', 'deaths'];

function _ListView() {
  // Props, States, Refs
  // const {
  //   applyGetLocation,
  //   unsetSelectedLocation,
  // } = props;
  const {
    locations, filteredLocations, selectedLocation, isLocationsLoading
  } = useLocationsSelector();
  const dispatch = useDispatch();
  const [isOnTablet, setIsOnTablet] = useState(false);
  const [isOnDesktop, setIsOnDesktop] = useState(true);
  const listLocationsRef = useRef(null);

  // Functions
  function onClickItem(id) {
    // setIsOnTablet(false);
    // if (!selectedLocation) applyGetLocation(id);
    // else if (selectedLocation.id !== id) applyGetLocation(id);
    // else unsetSelectedLocation();
  }

  function onFilterOpenClick() {
    dispatch(setModal(MODAL_FILTER));
  }

  function onFilterResetClick() {
    // TODO : Unset selected location and error
    dispatch(resetFilters());
  }

  function onInfoClick() {
    dispatch(setModal(MODAL_INFO));
  }

  function scrollToSelected(location) {
    // if (!location) return;

    // const parentBounds = listLocationsRef.current.getBoundingClientRect();
    // const childNodesArray = Array.from(listLocationsRef.current.childNodes[1].childNodes);
    // const selectedChild = childNodesArray.find(child => {
    //   return child.getAttribute('data-id') === `${location.id}`;
    // });
    // if (!selectedChild) return;

    // const childBounds = selectedChild.getBoundingClientRect();

    // const isExceedTop = childBounds.top < parentBounds.top;
    // const isExceedBottom = childBounds.bottom > parentBounds.bottom;
    // if (isExceedTop || isExceedBottom) {
    //   listLocationsRef.current.scrollTop = selectedChild.offsetTop - 20;
    // }
  }

  // Effects
  // useEffect(() => {
  //   scrollToSelected(selectedLocation);
  // }, [selectedLocation]);

  // Elements
  // - Open / Close
  let listviewClass = 'list-view';
  let tabletIconClass = 'icon is-medium';
  let desktopIconClass = 'icon is-medium';
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
      <div key={key} className="columns is-mobile">
        <div className="column">
          <h6 className={titleClass}>{title}</h6>
        </div>
        <div className="column is-narrow">
          <p className="is-6 has-text-right">{count.toLocaleString('en')}</p>
        </div>
      </div>
    );
  });

  let totalElements = (
    <>
      <h4 className="title is-4">Total</h4>
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
              <i className="fas fa-filter"></i>
            </span>
            <span>Filter</span>
          </button>
        </div>
        <div className="control">
          <button className="button is-small" onClick={onFilterResetClick}>
            <span className="icon">
              <i className="fas fa-undo"></i>
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
            <h6 className="title is-6">{title}</h6>
          </div>
          <div className="column is-narrow">
            <p className="is-6 has-text-right">{confirmed.toLocaleString('en')}</p>
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
            <i className="fas fa-angle-double-right fa-lg"></i>
          </span>
        </div>
        <div
          className="list-view__menu-item list-view__switch is-hidden-touch"
          onClick={_ => setIsOnDesktop(prev => !prev)}
        >
          <span className={desktopIconClass}>
            <i className="fas fa-angle-double-right fa-lg"></i>
          </span>
        </div>
        <div className="list-view__menu-item" onClick={onInfoClick}>
          <span className="icon is-medium">
            <i className="fas fa-info-circle"></i>
          </span>
        </div>
      </div>
      <div className="list-view__content">
        <div className="list-view__brand">
          <h1 className="title is-5">COVID-19 Tracker</h1>
          <h3 className="subtitle is-7">by Zinglecode</h3>
          <div className="list-view__logo" />
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
