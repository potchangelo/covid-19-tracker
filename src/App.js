import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapView, ListView, DetailsView, FilterView, InfoView, LoadingView, ErrorView } from './components';
import { getLocations } from './redux/locations/locationsSlice';
import './css/leafletFixed.css';
import './css/app.scss';

function App() {
  const { isLocationsLoading } = useSelector(state => state.locations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations());
  }, []);

  return (
    <div className="app">
      {/* <ListView /> */}
      <MapView />
      {/* <DetailsView /> */}
      {/* <FilterView /> */}
      {/* <InfoView /> */}
      <LoadingView isShow={isLocationsLoading} label="Loading" extraClass="loading-view__app" />
      {/* <ErrorView /> */}
    </div>
  );
}

export default App;
