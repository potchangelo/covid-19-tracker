import * as type from './actionType';

function errorReducer(state = null, action) {
    switch (action.type) {
        case type.SET_ERROR: {
            return action.payload.error;
        }
        case type.UNSET_ERROR: {
            return null;
        }
        default: {
            return state;
        }
    }
}

export default errorReducer;
