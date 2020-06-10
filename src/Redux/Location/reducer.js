import * as key from "./actionKey";

const initialState = {
    locationArray: [],
    selectedLocation: null,
    isLocationArrayLoading: true,
    isSelectedLocationLoading: false
}

// reducers
// action.type to switch, action.payload for data
function locationReducer(state = initialState, action) {
    switch (action.type) {
        case key.SET_LOCATION_ARRAY: {
            const { locationArray } = action.payload;
            return {
                ...state,
                locationArray,
            };
        }

        case key.SET_LOCATION_ARRAY_LOADING: {
            const { isLoading } = action.payload;
            return {
                ...state,
                isLocationArrayLoading: isLoading
            };
        }
        case key.SET_SELECTED_LOCATION: {
            const { location } = action.payload;
            return {
                ...state,
                selectedLocation: location
            };
        }
        case key.SET_SELECTED_LOCATION_LOADING: {
            const { isLoading } = action.payload;
            return {
                ...state,
                isSelectedLocationLoading: isLoading
            };
        }
        default: {
            return state;
        }
    } 
}

export default locationReducer;