import React from 'react';

function Modal(props) {
    const { 
        extraClass, 
        extraContentClass,
        isShow, 
        onClickClose, 
        children 
    } = props;

    if (!isShow) return null;

    let modalClass = 'modal is-active';
    if (extraClass !== undefined) modalClass += ` ${extraClass}`;

    let contentClass = 'modal-content';
    if (extraContentClass !== undefined) contentClass += ` ${extraContentClass}`;

    return (
        <div className={modalClass}>
            <div className="modal-background" onClick={onClickClose}></div>
            <div className={contentClass}>
                { children }
            </div>
            <button className="modal-close is-large" onClick={onClickClose}></button>
        </div>
    );
}

export { Modal }