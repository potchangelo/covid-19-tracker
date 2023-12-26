import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { DetailsView, ErrorView, FilterView, InfoView, ListView, LoadingView, MapView } from './components';
import './css/app.scss';
import './css/leafletFixed.css';
import { setError } from './redux/error/slice';
import { useLocationsSelector } from './redux/locations/selector';
import { getLocations } from './redux/locations/slice';

function App() {
  const { isLocationsLoading } = useLocationsSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations())
      .unwrap()
      .catch(error => {
        dispatch(setError(error));
      });
  }, [dispatch]);

  return (
    <div className="app">
      <ListView />
      <MapView />
      <DetailsView />
      <FilterView />
      <InfoView />
      <LoadingView isShow={isLocationsLoading} label="Loading" extraClass="loading-view__app" />
      <ErrorView />
    </div>
  );
}

export default App;
