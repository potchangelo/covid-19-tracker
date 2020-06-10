import * as key from "./actionKey";

const initialState = {
    name: '', minConfirmed: 0, maxConfirmed: 5000000
};

// reducers
// action.type to switch, action.payload for data
function filterReducer(state = initialState, action) {
    switch (action.type) {
        case key.SET_FILTER: {
            const {
                 name, minConfirmed, maxConfirmed 
            } = action.payload;
            return {
                name, minConfirmed, maxConfirmed
            };
        }
        case key.RESET_FILTER: {
            return { ...initialState };
        }
        default: {
            return state;
        }
    } 
}

export default filterReducer;