import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// reducers
function locationArray22(state = [], action) {
    switch (action.type) {
        case 'ADD_LOCATION':
            return [...state, action.payload];

        default:
            return state;
    } 
}

export default createStore(
    combineReducers({locationArray22}),
    applyMiddleware(thunk)
);