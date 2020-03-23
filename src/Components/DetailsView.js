import React from 'react';

const totalKeyArray = ['confirmed', 'recovered', 'deaths'];

function DetailsView(props) {
    // Props
    const {
        location: { country, province, latest },
        onClickClose
    } = props;

    // Elements
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

    return (
        <div className="details-view">
            <div className="details-view__close" onClick={onClickClose}>
                <span className="icon is-medium">
                    <i className="fas fa-times fa-lg"></i>
                </span>
            </div>
            <div className="details-view__content">
                <div className="details-view__text">
                    <h4 className="title is-4">{title}</h4>
                    {totalElements}
                </div>
                <div className="details-view__graph">
                    <h4 className="title is-4">Confirmed timeline</h4>
                    <div className="d3chart"></div>
                </div>
            </div>
        </div>
    );
}

export default DetailsView;