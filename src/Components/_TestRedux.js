import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addLocationAsync } from '../Redux/action';
import { bindActionCreators } from 'redux';

function TestRedux(props) {
    console.log(props);

    useEffect(() => {
        props.addLocationAsync()
    }, [])

    return <div></div>;
}

function mapStateToProps(state) {
    const { locationArray22 } = state;
    return { locationArray22 }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addLocationAsync
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TestRedux);