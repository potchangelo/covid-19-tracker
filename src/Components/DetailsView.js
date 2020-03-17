import React from 'react';

function DetailsView(props) {
    const { location, onClickClose } = props;
    const { country, province } = location;

    // Elements
    const label = (province !== '') ? `${province}, ${country}` : country;
    const totalElements = ['confirmed', 'recovered', 'deaths'].map(key => {
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        const count = location[`${key}Count`];
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

    return (
        <div className="detailsview">
            <div className="detailsview__close" onClick={onClickClose}>
                <span className="icon is-medium">
                    <i className="fas fa-times fa-lg"></i>
                </span>
            </div>
            <h4 className="title is-4">{label}</h4>
            {totalElements}
        </div>
    );
}

export default DetailsView;