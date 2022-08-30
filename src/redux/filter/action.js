import * as type from './actionType';

const setTempName = name => ({
  type: type.SET_TEMP_NAME,
  payload: { name },
});

const setTempMinConfirmed = minConfirmed => ({
  type: type.SET_TEMP_MIN_CONFIRMED,
  payload: { minConfirmed },
});

const setTempMaxConfirmed = maxConfirmed => ({
  type: type.SET_TEMP_MAX_CONFIRMED,
  payload: { maxConfirmed },
});

const setFilter = () => ({
  type: type.SET_FILTER,
});

const cancelFilter = () => ({
  type: type.CANCEL_FILTER,
});

const resetFilter = () => ({
  type: type.RESET_FILTER,
});

export { setTempName, setTempMinConfirmed, setTempMaxConfirmed, setFilter, cancelFilter, resetFilter };
