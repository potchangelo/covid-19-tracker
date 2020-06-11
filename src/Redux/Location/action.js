import api from "../../Api";
import * as type from "./actionType";
import { setError, unsetError } from '../Error/action';

// Normal actions
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

// Async actions
const getLocationArray = () => dispatch => {
    return api.getAllLocation().then(response => {
        const { locations } = response.data;
        const sortedLocation = [...locations].sort((location1, location2) => {
            return location2.latest.confirmed - location1.latest.confirmed;
        });
        dispatch(setLocationArray(sortedLocation));
    }).catch(error => {
        dispatch(setError(error));
    }).finally(() => {
        dispatch(setLocationArrayLoading(false));
    });
}

const getLocation = id => dispatch => {
    dispatch(setSelectedLocationLoading(true));
    dispatch(unsetError());
    return api.getLocation(id).then(response => {
        const { location } = response.data;
        // const { coordinates: { latitude, longitude } } = location;

        // let nextLatitude = latitude;
        // if (appRef.current.offsetWidth < mqDesktop) {
        //     if (latitude >= 65) nextLatitude -= 0.5
        //     else if (latitude < 65 && latitude >= 50) nextLatitude -= 1;
        //     else if (latitude < 50 && latitude >= 45) nextLatitude -= 1.5;
        //     else nextLatitude -= 2;
        // }

        // setSelectedLocation(location);
        // setMapViewport({ center: [nextLatitude, longitude], zoom: 6 });
        dispatch(setSelectedLocation(location));
    }).catch(error => {
        dispatch(unsetSelectedLocation());
        dispatch(setError(error));
    }).finally(() => {
        dispatch(setSelectedLocationLoading(false));
    });
}

export { getLocationArray, getLocation, unsetSelectedLocation };