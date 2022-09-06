import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLocations as apiGetLocations } from '../../fetchers/locations';

const getLocations = createAsyncThunk(
  'locations/getLocations',
  async () => {
    const response = await apiGetLocations();
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
    // setLocations: (state, action) => {
    //   const { locations } = action.payload;
    //   state.locations = locations;
    // },
    // setLocationsLoading: (state, action) => {
    //   const { isLoading } = action.payload;
    //   state.isLocationsLoading = isLoading;
    // },
    setSelectedLocation: (state, action) => {
      const { location } = action.payload;
      state.selectedLocation = location;
    },
    setSelectedLocationLoading: (state, action) => {
      const { isLoading } = action.payload;
      state.isSelectedLocationLoading = isLoading;
    }
  },
  extraReducers: builder => {
    builder.addCase(getLocations.fulfilled, (state, action) => {
      const { locations } = action.payload;
      state.locations = locations;
      state.isLocationsLoading = false;
    });
    builder.addCase(getLocations.rejected, (state, action) => {
      console.log(action);
      state.isLocationsLoading = false;
    });
  }
});

export { getLocations };
export default slice.reducer;
