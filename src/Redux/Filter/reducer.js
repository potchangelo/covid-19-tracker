import * as type from './actionType';

const initialState = {
  name: '',
  minConfirmed: 0,
  maxConfirmed: 500000000,
  tempName: '',
  tempMinConfirmed: 0,
  tempMaxConfirmed: 500000000,
};

// reducers
// action.type to switch, action.payload for data
function filterReducer(state = initialState, action) {
  switch (action.type) {
    case type.SET_TEMP_NAME: {
      const { name } = action.payload;
      return { ...state, tempName: name };
    }
    case type.SET_TEMP_MIN_CONFIRMED: {
      const { minConfirmed } = action.payload;
      return { ...state, tempMinConfirmed: minConfirmed };
    }
    case type.SET_TEMP_MAX_CONFIRMED: {
      const { maxConfirmed } = action.payload;
      return { ...state, tempMaxConfirmed: maxConfirmed };
    }
    case type.SET_FILTER: {
      const { tempName: name, tempMinConfirmed: minConfirmed, tempMaxConfirmed: maxConfirmed } = state;
      return {
        ...state,
        name,
        minConfirmed,
        maxConfirmed,
      };
    }
    case type.CANCEL_FILTER: {
      const { name: tempName, minConfirmed: tempMinConfirmed, maxConfirmed: tempMaxConfirmed } = state;
      return {
        ...state,
        tempName,
        tempMinConfirmed,
        tempMaxConfirmed,
      };
    }
    case type.RESET_FILTER: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
}

export default filterReducer;
