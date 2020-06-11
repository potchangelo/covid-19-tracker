import './Css/ListView.scss';

import React, { useState, useRef, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoadingView from './_LoadingView';

import { unsetSelectedLocation } from '../Redux/Location/action';
import { applyGetLocation } from '../Redux/Location/actionThunk';
import { getFilteredLocationArray } from '../Redux/Location/selector';
import { applyResetFilter } from '../Redux/Filter/actionThunk';
import { setModal } from '../Redux/Modal/action';
import { FILTER, INFO } from '../Redux/Modal/name';

const totalKeyArray = ['confirmed', 'recovered', 'deaths'];

function ListView(props) {
    // Props, States, Refs
    const { 
        locationArray, selectedLocation, isLoading, 
        applyGetLocation, unsetSelectedLocation,
        applyResetFilter, setModal
    } = props;

    const [isOnTablet, setIsOnTablet] = useState(false);
    const [isOnDesktop, setIsOnDesktop] = useState(true);

    const listLocationsRef = useRef(null);

    // Functions

    function onClickItem(id) {
        setIsOnTablet(false);
        if (!selectedLocation) applyGetLocation(id);
        else if (selectedLocation.id !== id) applyGetLocation(id);
        else unsetSelectedLocation();
    }

    function scrollToSelected(location) {
        if (!location) return;

        const parentBounds = listLocationsRef.current.getBoundingClientRect();
        const childArray = Array.from(listLocationsRef.current.childNodes[1].childNodes);
        const selectedChild = childArray.find(child => {
            return child.getAttribute('data-id') === `${location.id}`
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
    const totalDataElements = totalKeyArray.map(key => {
        const title = key.charAt(0).toUpperCase() + key.slice(1);
        const count = locationArray.reduce((sum, location) => {
            return sum + location.latest[key];
        }, 0);

        if (count === 0) return null;

        let titleClass = 'title is-6';
        if (key === 'recovered') titleClass += ' has-text-success';
        else if (key === 'deaths') titleClass += ' has-text-danger';

        return (
            <div key={key} className="columns is-mobile">
                <div className="column is-8">
                    <h6 className={titleClass}>{title}</h6>
                </div>
                <div className="column">
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
                    <button className="button is-small" onClick={_ => setModal(FILTER)}>
                        <span className="icon">
                            <i className="fas fa-filter"></i>
                        </span>
                        <span>Filter</span>
                    </button>
                </div>
                <div className="control">
                    <button className="button is-small" onClick={applyResetFilter}>
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
    const locationDataElements = locationArray.map(location => {
        const {
            id, country, country_code, province,
            latest: { confirmed }
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
                    <div className="column is-8">
                        <h6 className="title is-6">{title}</h6>
                    </div>
                    <div className="column">
                        <p className="is-6 has-text-right">{confirmed.toLocaleString('en')}</p>
                    </div>
                </div>
            </div>
        );
    });

    let locationElements = (
        <div className="list-view__locations-data">
            {locationDataElements}
        </div>
    );

    // - Loading
    const loadingView = (
        <LoadingView isShow={isLoading} extraClass="loading-view__side" />
    )
    if (isLoading) {
        totalElements = null;
        filterElements = null;
        locationElements = null;
    }

    return (
        <div className={listviewClass}>
            <div className="list-view__menu">
                <div className="list-view__menu-item list-view__switch is-hidden-desktop" onClick={_ => setIsOnTablet(prev => !prev)}>
                    <span className={tabletIconClass}>
                        <i className="fas fa-angle-double-right fa-lg"></i>
                    </span>
                </div>
                <div className="list-view__menu-item list-view__switch is-hidden-touch" onClick={_ => setIsOnDesktop(prev => !prev)}>
                    <span className={desktopIconClass}>
                        <i className="fas fa-angle-double-right fa-lg"></i>
                    </span>
                </div>
                <div className="list-view__menu-item" onClick={_ => setModal(INFO)}>
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

function mapStateToProps(state) {
    const locationArray = getFilteredLocationArray(state);
    const {
         selectedLocation, 
         isLocationArrayLoading: isLoading
    } = state.locationReducer;
    return { locationArray, selectedLocation, isLoading };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
        applyGetLocation, unsetSelectedLocation, 
        applyResetFilter, setModal
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView);