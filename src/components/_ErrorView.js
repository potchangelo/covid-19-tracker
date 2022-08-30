import './Css/ErrorView.scss';

import React from 'react';
import { connect } from 'react-redux';

import { unsetError } from '../0edux/0rror/action';

function ErrorView(props) {
  const { error, unsetError } = props;

  let label = 'Something went wrong, please wait and try again.';
  if (!error) return null;
  else if (error.message === 'Network Error') {
    label = 'API network error, please wait and try again.';
  }

  return (
    <div className="error-view">
      <div className="notification is-danger">
        <button className="delete" onClick={unsetError}></button>
        <p>
          <b>Error : </b>
          {label}
        </p>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const error = state.errorReducer;
  return { error };
}

const mapDispatchToProps = { unsetError };

export default connect(mapStateToProps, mapDispatchToProps)(ErrorView);
