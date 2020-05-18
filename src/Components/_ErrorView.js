import './Css/ErrorView.scss';
import React from 'react';

function ErrorView(props) {
    const { error, onClickClose } = props;

    let label = 'Something went wrong, please wait and try again.'
    if (!error) return null;
    else if (error.message === 'Network Error') {
        label = 'API network error, please wait and try again.'
    }

    return (
        <div className="error-view">
            <div className="notification is-danger">
                <button className="delete" onClick={onClickClose}></button>
                <p><b>Error : </b>{label}</p>
            </div>
        </div>
    );
}

export default ErrorView;