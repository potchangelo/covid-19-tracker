import { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MapView, ListView, DetailsView, FilterView, InfoView, LoadingView, ErrorView } from './components';
import { applyGetLocations } from './redux/location/actionThunk';
import './css/leafletFixed.css';
import './css/app.scss';

function App(props) {
  // Props, States
  const { isLoading, applyGetLocations } = props;

  // Functions
  const onLoad = useCallback(() => applyGetLocations(), [applyGetLocations]);

  // Effects
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <div className="app">
      <ListView />
      <MapView />
      <DetailsView />
      <FilterView />
      <InfoView />
      <LoadingView isShow={isLoading} label="Loading" extraClass="loading-view__app" />
      <ErrorView />
    </div>
  );
}

function mapStateToProps(state) {
  const { isLocationsLoading: isLoading } = state.locationReducer;
  return { isLoading };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ applyGetLocations }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
