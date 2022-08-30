import * as type from './actionType';

function modalReducer(state = null, action) {
  switch (action.type) {
    case type.SET_MODAL: {
      return action.payload.name;
    }
    case type.UNSET_MODAL: {
      return null;
    }
    default: {
      return state;
    }
  }
}

export default modalReducer;
