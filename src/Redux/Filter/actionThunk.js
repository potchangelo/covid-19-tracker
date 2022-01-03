import { setFilter, cancelFilter, resetFilter } from './action';
import { unsetSelectedLocation } from '../Location/action';
import { unsetModal } from '../Modal/action';
import { unsetError } from '../Error/action';

const applySetFilter = () => dispatch => {
  dispatch(setFilter());
  dispatch(unsetSelectedLocation());
  dispatch(unsetModal());
  dispatch(unsetError());
};

const applyCancelFilter = () => dispatch => {
  dispatch(cancelFilter());
  dispatch(unsetModal());
};

const applyResetFilter = () => dispatch => {
  dispatch(resetFilter());
  dispatch(unsetSelectedLocation());
  dispatch(unsetError());
};

export { applySetFilter, applyCancelFilter, applyResetFilter };
