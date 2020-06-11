import * as type from "./actionType";

const initialState = {
    locationArray: [],
    selectedLocation: null,
    isLocationArrayLoading: true,
    isSelectedLocationLoading: false
}

function locationReducer(state = initialState, action) {
    switch (action.type) {
        case type.SET_LOCATION_ARRAY: {
            const { locationArray } = action.payload;
            return {
                ...state,
                locationArray,
            };
        }

        case type.SET_LOCATION_ARRAY_LOADING: {
            const { isLoading } = action.payload;
            return {
                ...state,
                isLocationArrayLoading: isLoading
            };
        }
        case type.SET_SELECTED_LOCATION: {
            const { location } = action.payload;
            return {
                ...state,
                selectedLocation: location
            };
        }
        case type.SET_SELECTED_LOCATION_LOADING: {
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