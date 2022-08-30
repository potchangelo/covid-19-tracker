import { getLocations, getLocation } from '../../fetchers/locations';
import {
  setLocations,
  setLocationsLoading,
  setSelectedLocation,
  setSelectedLocationLoading,
  unsetSelectedLocation,
} from './action';
import { setError, unsetError } from '../error/action';

const applyGetLocations = () => dispatch => {
  return getLocations()
    .then(response => {
      const { locations } = response.data;
      const sortedLocations = [...locations].sort((location1, location2) => {
        return location2.latest.confirmed - location1.latest.confirmed;
      });
      dispatch(setLocations(sortedLocations));
    })
    .catch(error => {
      dispatch(setError(error));
    })
    .finally(() => {
      dispatch(setLocationsLoading(false));
    });
};

const applyGetLocation = id => dispatch => {
  dispatch(setSelectedLocationLoading(true));
  dispatch(unsetError());
  return getLocation(id)
    .then(response => {
      const { location } = response.data;
      dispatch(setSelectedLocation(location));
    })
    .catch(error => {
      dispatch(unsetSelectedLocation());
      dispatch(setError(error));
    })
    .finally(() => {
      dispatch(setSelectedLocationLoading(false));
    });
};

export { applyGetLocations, applyGetLocation };
