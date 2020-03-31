import './Css/ListView.scss';
import React, { useState, useRef, useEffect } from 'react';
import LoadingView from './_LoadingView';
import Logo from '../Images/Logo64.png';

const totalKeyArray = ['confirmed', 'recovered', 'deaths'];

function ListView(props) {
    // Props, States
    const { 
        locationArray, 
        selectedLocation, 
        isLoading, 
        onSelectItem, 
        onDeselectItem,
        onClickInfo
    } = props;
    const [isOnTablet, setIsOnTablet] = useState(false);
    const [isOnDesktop, setIsOnDesktop] = useState(true);

    const listLocationsRef = useRef(null);

    // Functions
    function onClickItem(id) {
        setIsOnTablet(false);
        if (selectedLocation === null) onSelectItem(id);
        else if (selectedLocation.id !== id) onSelectItem(id);
        else onDeselectItem();
    }

    function scrollToSelected(location) {
        if (location === null) return;

        const parentBounds = listLocationsRef.current.getBoundingClientRect();
        const childArray = Array.from(listLocationsRef.current.childNodes);
        const selectedChild = childArray.find(child => {
            return child.getAttribute('data-id') === `${location.id}`
        });
        if (selectedChild === undefined) return;

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
    // 1. Open / Close
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

    // 2. Total
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

    // 3. Locations
    let locationElements = locationArray.map(location => {
        const {
            id, country, country_code, province,
            latest: { confirmed }
        } = location;

        let title = country;
        if (province !== '' && province !== country) {
            title = `${province}, ${country}`;
        }
        let locationClass = 'list-view__location';
        if (selectedLocation !== null) {
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

    // 4. Loading
    const loadingView = (
        <LoadingView isLoading={isLoading} extraClass="loading-view__side" />
    )
    if (isLoading) {
        totalElements = null;
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
                <div className="list-view__menu-item" onClick={onClickInfo}>
                    <span className="icon is-medium">
                        <i className="fas fa-info-circle"></i>
                    </span>
                </div>
            </div>
            <div className="list-view__content">
                <div className="list-view__brand">
                    <h1 className="title is-5">COVID-19 Tracker</h1>
                    <h3 className="subtitle is-7">by Zinglecode</h3>
                    <img className="list-view__logo" src={Logo} alt="zinglecode" />
                </div>
                <div className="list-view__stat list-view__content-block">
                    {loadingView}
                    {totalElements}
                </div>
                <div className="list-view__locations list-view__content-block" ref={listLocationsRef}>
                    {loadingView}
                    {locationElements}
                </div>
            </div>
        </div>
    );
}

export default ListView;