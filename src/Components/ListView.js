import React from 'react';

function ListView(props) {
    const { 
        latest, 
        locationArray, 
        selectedLocation, 
        onSelectItem, 
        onDeselectItem 
    } = props;

    function onClickItem(id) {
        if (selectedLocation === null) onSelectItem(id);
        else if (selectedLocation.id !== id) onSelectItem(id);
        else onDeselectItem();
    }

    // Elements
    const totalElements = ['confirmed', 'recovered', 'deaths'].map(key => {
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        const count = latest[key];
        return (
            <div key={key} className="columns">
                <div className="column">
                    <h6 className="title is-6">{label}</h6>
                </div>
                <div className="column">
                    <p className="is-6 has-text-right">{count}</p>
                </div>
            </div>
        );
    });

    const locationElements = locationArray.map(location => {
        const { id, country, province, confirmedCount } = location;
        const label = (province !== '') ? `${province}, ${country}` : country;
        let locationClass = 'listview__location';
        if (selectedLocation !== null) {
            if (location.id === selectedLocation.id) {
                locationClass += ' selected';
            }
        }
        return (
            <div key={id} className={locationClass} onClick={_ => onClickItem(id)}>
                <div className="columns">
                    <div className="column">
                        <h6 className="title is-6">{label}</h6>
                    </div>
                    <div className="column">
                        <p className="is-6 has-text-right">{confirmedCount}</p>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="listview">
            <div className="listview__brand">
                <h2 className="title is-5">COVID-19 Tracker</h2>
            </div>
            <div className="listview__stat">
                <h4 className="title is-4">Total</h4>
                {totalElements}
            </div>
            <div className="listview__locations">
                {locationElements}
            </div>
        </div>
    );
}

export default ListView;