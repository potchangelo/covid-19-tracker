import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { applyGetLocations, applyGetLocation } from '../redux/location/actionThunk';

function TestRedux(props) {
  console.log(props.isSelectedLocationLoading);

  useEffect(() => {
    props.applyGetLocations();
    setTimeout(() => {
      props.applyGetLocation(154);
    }, 1500);
  }, []);

  return <div></div>;
}

function mapStateToProps(state) {
  const { locations, selectedLocation, isLocationsLoading, isSelectedLocationLoading } = state.locationReducer;
  return { locations, selectedLocation, isLocationsLoading, isSelectedLocationLoading };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      applyGetLocations,
      applyGetLocation,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TestRedux);
