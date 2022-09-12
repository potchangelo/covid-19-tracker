import * as type from './actionType';

const initialState = {
  locations: [],
  selectedLocation: null,
  isLocationsLoading: true,
  isSelectedLocationLoading: false,
};

function locationReducer(state = initialState, action) {
  switch (action.type) {
    case type.SET_LOCATIONS: {
      const { locations } = action.payload;
      return {
        ...state,
        locations,
      };
    }

    case type.SET_LOCATIONS_LOADING: {
      const { isLoading } = action.payload;
      return {
        ...state,
        isLocationsLoading: isLoading,
      };
    }
    case type.SET_SELECTED_LOCATION: {
      const { location } = action.payload;
      return {
        ...state,
        selectedLocation: location,
      };
    }
    case type.SET_SELECTED_LOCATION_LOADING: {
      const { isLoading } = action.payload;
      return {
        ...state,
        isSelectedLocationLoading: isLoading,
      };
    }
    default: {
      return state;
    }
  }
}

export default locationReducer;
