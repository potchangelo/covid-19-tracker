import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLocations as apiGetLocations, getLocation as apiGetLocation } from '../../fetchers/locations';

const getLocations = createAsyncThunk(
  'locations/getLocations',
  async () => {
    const response = await apiGetLocations();
    return response.data;
  }
);

const getLocation = createAsyncThunk(
  'locations/getLocation',
  async (id) => {
    const response = await apiGetLocation(id);
    return response.data;
  }
);

const slice = createSlice({
  name: 'locations',
  initialState: {
    locations: [],
    selectedLocation: null,
    isLocationsLoading: true,
    isSelectedLocationLoading: false,
  },
  reducers: {
    unsetSelectedLocation: (state) => {
      state.selectedLocation = null;
    }
  },
  extraReducers: builder => {
    // Locations
    builder.addCase(getLocations.pending, state => {
      state.isLocationsLoading = true;
    });
    builder.addCase(getLocations.fulfilled, (state, action) => {
      const { locations } = action.payload;
      state.locations = [...locations].sort((location1, location2) => {
        return location2.latest.confirmed - location1.latest.confirmed;
      });;
      state.isLocationsLoading = false;
    });
    builder.addCase(getLocations.rejected, (state, action) => {
      // action.error.message
      state.isLocationsLoading = false;
    });

    // Selected location
    builder.addCase(getLocation.pending, state => {
      state.isSelectedLocationLoading = true;
    });
    builder.addCase(getLocation.fulfilled, (state, action) => {
      const { location } = action.payload;
      state.selectedLocation = location;
      state.isSelectedLocationLoading = false;
    });
    builder.addCase(getLocation.rejected, (state, action) => {
      state.selectedLocation = null;
      state.isSelectedLocationLoading = false;
    });
  }
});

export const { unsetSelectedLocation } = slice.actions;
export { getLocations, getLocation };
export default slice.reducer;
