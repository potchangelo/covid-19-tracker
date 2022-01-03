import 'leaflet/dist/leaflet.css';
import './css/App.scss';

import React, { useEffect, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MapView, ListView, DetailsView, FilterView, InfoView, LoadingView, ErrorView } from './Components';

import { applyGetLocationArray } from './Redux/Location/actionThunk';

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
