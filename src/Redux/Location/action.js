import * as type from "./actionType";

const setLocationArray = locationArray => ({
    type: type.SET_LOCATION_ARRAY,
    payload: { locationArray }
});

const setLocationArrayLoading = isLoading => ({
    type: type.SET_LOCATION_ARRAY_LOADING,
    payload: { isLoading }
});

const setSelectedLocation = location => ({
    type: type.SET_SELECTED_LOCATION,
    payload: { location }
});

const setSelectedLocationLoading = isLoading => ({
    type: type.SET_SELECTED_LOCATION_LOADING,
    payload: { isLoading }
});

const unsetSelectedLocation = () => ({
    type: type.SET_SELECTED_LOCATION,
    payload: { location: null }
});

export { setLocationArray, setLocationArrayLoading, setSelectedLocation, setSelectedLocationLoading, unsetSelectedLocation };