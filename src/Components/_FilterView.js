import './Css/FilterView.scss';

import React from 'react';
import { connect } from 'react-redux';

import { Modal } from '../layouts';

import { 
    setTempName, setTempMinConfirmed, setTempMaxConfirmed, 
} from '../Redux/Filter/action';
import { 
    applySetFilter, applyCancelFilter 
} from '../Redux/Filter/actionThunk';
import { FILTER } from '../Redux/Modal/name';

function FilterView(props) {
    // Props
    const {
        isShow, name, minConfirmed, maxConfirmed,
        setName, setMinConfirmed, setMaxConfirmed, 
        applySetFilter, applyCancelFilter
    } = props;

    // Functions
    function onSubmitFilter(e) {
        e.preventDefault();
        applySetFilter();
    }

    return (
        <Modal
            extraClass="filter-view"
            extraContentClass="filter-view__content"
            isShow={isShow}
            onClickClose={applyCancelFilter}>
            <form action="#" onSubmit={onSubmitFilter}>
                <h4 className="title is-4">Filter countries</h4>
                <label className="label">Search by name</label>
                <div className="field more-margin-bottom">
                    <div className="control is-expanded">
                        <input
                            className="input"
                            type="text"
                            placeholder="Leave blank to ignore name-filter."
                            value={name}
                            onChange={e => setName(e.target.value)} />
                    </div>
                </div>
                <label className="label">Confirmed cases</label>
                <div className="columns is-mobile more-margin-bottom">
                    <div className="column">
                        <label className="label is-size-7">Min</label>
                        <div className="field">
                            <div className="control is-expanded">
                                <input
                                    className="input"
                                    type="number"
                                    value={minConfirmed}
                                    onChange={e => setMinConfirmed(Number(e.target.value))} />
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
                                    onChange={e => setMaxConfirmed(Number(e.target.value))} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-grouped is-grouped-right">
                    <div className="control">
                        <button
                            className="button"
                            type="button"
                            onClick={applyCancelFilter} >
                            Cancel
                        </button>
                    </div>
                    <div className="control">
                        <button
                            className="button is-link"
                            type="submit" >
                            Filter
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

function mapStateToProps(state) {
    const { 
        tempName: name, 
        tempMinConfirmed: minConfirmed,
        tempMaxConfirmed: maxConfirmed
    } = state.filterReducer;
    const isShow = state.modalReducer === FILTER;
    return { isShow, name, minConfirmed, maxConfirmed };
}

const mapDispatchToProps = { 
    setName: setTempName, 
    setMinConfirmed: setTempMinConfirmed, 
    setMaxConfirmed: setTempMaxConfirmed, 
    applySetFilter, applyCancelFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterView);