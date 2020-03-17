import React, { useState, useRef, useEffect } from 'react';

function ListView(props) {
    // Props, States
    const { 
        latest, 
        locationArray, 
        selectedLocation, 
        isLoading, 
        onSelectItem, 
        onDeselectItem 
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
        const selectedChild = Array.from(listLocationsRef.current.childNodes).find(child => child.getAttribute('data-id') === selectedLocation.id);
        if (selectedChild === undefined) return;

        const childBounds = selectedChild.getBoundingClientRect();

        const isExceedTop = childBounds.top < parentBounds.top;
        const isExceedBottom = childBounds.bottom > parentBounds.bottom;
        if (isExceedTop || isExceedBottom) {
            listLocationsRef.current.scrollTop = selectedChild.offsetTop - parentBounds.top - 20;
        }
    }

    // Effects
    useEffect(() => {
        scrollToSelected(selectedLocation);
    }, [selectedLocation])

    // Elements
    let loadingView = null;
    let totalElements = null;
    let locationElements = null;
    if (isLoading) {
        loadingView = (
            <div className="listview__loading">
				<span className="icon">
                    <i className="fas fa-circle-notch fa-lg fa-spin" ></i>
                </span>
			</div>
        );
    }
    else {
        const totalDataElements = ['confirmed', 'recovered', 'deaths'].map(key => {
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            const count = latest[key];
            return (
                <div key={key} className="columns is-mobile">
                    <div className="column is-8">
                        <h6 className="title is-6">{label}</h6>
                    </div>
                    <div className="column">
                        <p className="is-6 has-text-right">{count}</p>
                    </div>
                </div>
            );
        });
        totalElements = (
            <>
                <h4 className="title is-4">Total</h4>
                {totalDataElements}
            </>
        );

        locationElements = locationArray.map(location => {
            const { id, country, province, confirmedCount } = location;
            const label = (province !== '') ? `${province}, ${country}` : country;
            let locationClass = 'listview__location';
            if (selectedLocation !== null) {
                if (location.id === selectedLocation.id) {
                    locationClass += ' selected';
                }
            }
            return (
                <div key={id} className={locationClass} onClick={_ => onClickItem(id)} data-id={id}>
                    <div className="columns is-mobile">
                        <div className="column is-8">
                            <h6 className="title is-6">{label}</h6>
                        </div>
                        <div className="column">
                            <p className="is-6 has-text-right">{confirmedCount}</p>
                        </div>
                    </div>
                </div>
            );
        });
    }

    let listviewClass = 'listview';
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

    return (
        <div className={listviewClass}>
            <div className="listview__switch is-hidden-desktop" onClick={_ => setIsOnTablet(prev => !prev)}>
                <span className={tabletIconClass}>
                    <i className="fas fa-angle-double-right fa-lg"></i>
                </span>
            </div>
            <div className="listview__switch is-hidden-touch" onClick={_ => setIsOnDesktop(prev => !prev)}>
                <span className={desktopIconClass}>
                    <i className="fas fa-angle-double-right fa-lg"></i>
                </span>
            </div>
            <div className="listview__brand">
                <h2 className="title is-5">COVID-19 Tracker</h2>
            </div>
            <div className="listview__stat">
                {loadingView}
                {totalElements}
            </div>
            <div className="listview__locations" ref={listLocationsRef}>
                {loadingView}
                {locationElements}
            </div>
        </div>
    );
}

export default ListView;