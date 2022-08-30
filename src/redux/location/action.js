import * as type from './actionType';

const setLocations = locations => ({
  type: type.SET_LOCATIONS,
  payload: { locations },
});

const setLocationsLoading = isLoading => ({
  type: type.SET_LOCATIONS_LOADING,
  payload: { isLoading },
});

const setSelectedLocation = location => ({
  type: type.SET_SELECTED_LOCATION,
  payload: { location },
});

const setSelectedLocationLoading = isLoading => ({
  type: type.SET_SELECTED_LOCATION_LOADING,
  payload: { isLoading },
});

const unsetSelectedLocation = () => ({
  type: type.SET_SELECTED_LOCATION,
  payload: { location: null },
});

export { setLocations, setLocationsLoading, setSelectedLocation, setSelectedLocationLoading, unsetSelectedLocation };
