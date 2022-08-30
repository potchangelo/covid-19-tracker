import './css/leaflet-fixed.css';
import './css/App.scss';
import { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MapView, ListView, DetailsView, FilterView, InfoView, LoadingView, ErrorView } from './components';
import { applyGetLocationArray } from './redux/location/actionThunk';

function App(props) {
  // Props, States
  const { isLoading, applyGetLocationArray } = props;

  // Functions
  const onLoad = useCallback(() => applyGetLocationArray(), [applyGetLocationArray]);

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
  const { isLocationArrayLoading: isLoading } = state.locationReducer;
  return { isLoading };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ applyGetLocationArray }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
