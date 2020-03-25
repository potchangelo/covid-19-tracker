import React from 'react';
import './Css/LoadingView.scss'

function LoadingView(props) {
    const { isLoading, label, extraClass } = props;

    if (!isLoading) return null;

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