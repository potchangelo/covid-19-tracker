import { useDispatch } from 'react-redux';
import { Modal } from '../layouts';
import { unsetError } from '../redux/error/slice';
import { useFiltersSelector } from '../redux/filters/selector';
import {
  cancelFilters,
  setFilters,
  setFiltersInputMaxConfirmed,
  setFiltersInputMinConfirmed,
  setFiltersInputName,
} from '../redux/filters/slice';
import { unsetSelectedLocation } from '../redux/locations/slice';
import { MODAL_FILTER } from '../redux/modal/name';
import { useModalSelector } from '../redux/modal/selector';
import { unsetModal } from '../redux/modal/slice';
import './css/filterView.scss';

function _FilterView() {
  // Data
  const modalName = useModalSelector();
  const { inputName, inputMinConfirmed, inputMaxConfirmed } = useFiltersSelector();
  const dispatch = useDispatch();
  const isShow = modalName === MODAL_FILTER;

  // Functions
  function onSubmit(event) {
    event.preventDefault();
    dispatch(setFilters());
    dispatch(unsetSelectedLocation());
    dispatch(unsetModal());
    dispatch(unsetError());
  }

  function onCancel() {
    dispatch(cancelFilters());
    dispatch(unsetModal());
  }

  return (
    <Modal extraClass="filter-view" extraContentClass="filter-view__content" isShow={isShow} onCloseClick={onCancel}>
      <form action="#" onSubmit={onSubmit}>
        <h5 className="title is-5">Filter countries</h5>
        <label className="label">Search by name</label>
        <div className="field more-margin-bottom">
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              placeholder="Leave blank to ignore name-filter."
              value={inputName}
              onChange={event => dispatch(setFiltersInputName(event.target.value))}
            />
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
                  value={inputMinConfirmed}
                  onChange={event => dispatch(setFiltersInputMinConfirmed(+event.target.value))}
                />
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
                  value={inputMaxConfirmed}
                  onChange={event => dispatch(setFiltersInputMaxConfirmed(+event.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field is-grouped is-grouped-right">
          <div className="control">
            <button className="button" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
          <div className="control">
            <button className="button is-link" type="submit">
              Filter
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default _FilterView;
