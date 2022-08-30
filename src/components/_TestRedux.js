import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { applyGetLocationArray, applyGetLocation } from '../redux/location/actionThunk';

function TestRedux(props) {
  console.log(props.isSelectedLocationLoading);

  useEffect(() => {
    props.applyGetLocationArray();
    setTimeout(() => {
      props.applyGetLocation(154);
    }, 1500);
  }, []);

  return <div></div>;
}

function mapStateToProps(state) {
  const { locationArray, selectedLocation, isLocationArrayLoading, isSelectedLocationLoading } = state.locationReducer;
  return { locationArray, selectedLocation, isLocationArrayLoading, isSelectedLocationLoading };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      applyGetLocationArray,
      applyGetLocation,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TestRedux);
