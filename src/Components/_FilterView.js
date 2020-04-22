import './Css/FilterView.scss';
import React, { useState, useEffect } from 'react';
import { Modal } from '../Layouts';

function FilterView(props) {
    // Props, States
    const {
        isShow,
        isNeedReset,
        locationArray,
        onClickFilter,
        onClickClose,
        onResetEnd
    } = props;

    const [query, setQuery] = useState('');
    const [minConfirmed, setMinConfirmed] = useState(0);
    const [maxConfirmed, setMaxConfirmed] = useState(1000000);

    // Functions
    function onSubmitFilter() {
        const nextLocationArray = locationArray.map(location => {
            let nextLocation = Object.assign({}, { ...location });
            const {
                country, province,
                latest: { confirmed }
            } = nextLocation;

            const lcCountry = country.toLowerCase();
            const lcProvince = province.toLowerCase();
            const lcQuery = query.toLowerCase();

            const isContainsQuery = lcCountry.includes(lcQuery) || lcProvince.includes(lcQuery);
            const isInConfirmedRange = confirmed >= minConfirmed && confirmed <= maxConfirmed;

            const isAllPassed = isContainsQuery && isInConfirmedRange;

            if (isAllPassed) delete nextLocation.isHidden;
            else nextLocation.isHidden = true;

            return nextLocation;
        });
        onClickFilter(nextLocationArray);
    }

    // Effects
    useEffect(() => {
        if (isNeedReset) {
            setQuery('');
            setMinConfirmed(0);
            setMaxConfirmed(100000);
            onResetEnd();
        }
    }, [isNeedReset, onResetEnd]);

    return (
        <Modal
            extraClass="filter-view"
            extraContentClass="filter-view__content"
            isShow={isShow}
            onClickClose={onClickClose}>
            <form action="#">
                <h4 className="title is-4">Filter countries</h4>
                <label className="label">Search by name</label>
                <div className="field">
                    <div className="control is-expanded">
                        <input
                            className="input"
                            type="text"
                            placeholder="Leave blank to ignore name-filter."
                            value={query}
                            onChange={e => setQuery(e.target.value)} />
                    </div>
                </div>
                <label className="label">Confirmed cases</label>
                <div className="columns is-mobile">
                    <div className="column">
                        <label className="label is-size-7">Min</label>
                        <div className="field">
                            <div className="control is-expanded">
                                <input
                                    className="input"
                                    type="number"
                                    value={minConfirmed}
                                    onChange={e => setMinConfirmed(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="column is-narrow">
                        <label className="label is-size-7">&nbsp;</label>
                        <p className="is-size-4"> - </p>
                    </div>
                    <div className="column">
                        <label className="label is-size-7">Max</label>
                        <div className="field">
                            <div className="control is-expanded">
                                <input
                                    className="input"
                                    type="number"
                                    value={maxConfirmed}
                                    onChange={e => setMaxConfirmed(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-grouped is-grouped-right">
                    <div className="control">
                        <button
                            className="button"
                            type="button"
                            onClick={onClickClose}>
                            Cancel
                            </button>
                    </div>
                    <div className="control">
                        <button
                            className="button is-link"
                            type="submit"
                            onClick={onSubmitFilter}>
                            Filter
                            </button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default FilterView;