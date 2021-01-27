import api from "../../api";
import { setLocationArray, setLocationArrayLoading, setSelectedLocation, setSelectedLocationLoading, unsetSelectedLocation } from './action';
import { setError, unsetError } from '../Error/action';

const applyGetLocationArray = () => dispatch => {
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

const applyGetLocation = id => dispatch => {
    dispatch(setSelectedLocationLoading(true));
    dispatch(unsetError());
    return api.getLocation(id).then(response => {
        const { location } = response.data;
        dispatch(setSelectedLocation(location));
    }).catch(error => {
        dispatch(unsetSelectedLocation());
        dispatch(setError(error));
    }).finally(() => {
        dispatch(setSelectedLocationLoading(false));
    });
}

export { applyGetLocationArray, applyGetLocation };