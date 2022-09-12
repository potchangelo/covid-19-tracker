import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MapView, ListView, DetailsView, FilterView, InfoView, LoadingView, ErrorView } from './components';
import { useLocationsSelector } from './redux/locations/selector';
import { getLocations } from './redux/locations/slice';
import './css/leafletFixed.css';
import './css/app.scss';

function App() {
  const { isLocationsLoading } = useLocationsSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations());
  }, []);

  return (
    <div className="app">
      <ListView />
      <MapView />
      {/* <DetailsView /> */}
      {/* <FilterView /> */}
      <InfoView />
      <LoadingView isShow={isLocationsLoading} label="Loading" extraClass="loading-view__app" />
      {/* <ErrorView /> */}
    </div>
  );
}

export default App;
