import './Css/LoadingView.scss';
import React from 'react';

function LoadingView(props) {
    const { isShow, label, extraClass } = props;

    if (!isShow) return null;

    let labelElement = null;
    if (label !== undefined) {
        labelElement = <span className="loading-view__label">Loading</span>;
    }

    let loadingClass = 'loading-view';
    if (extraClass !== undefined) loadingClass += ` ${extraClass}`;

    return (
        <div className={loadingClass}>
            <span className="icon">
                <i className="fas fa-circle-notch fa-lg fa-spin" ></i>
            </span>
            {labelElement}
        </div>
    );
}

export default LoadingView;