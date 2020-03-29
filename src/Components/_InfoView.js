import './Css/InfoView.scss';
import React from 'react';

function InfoView(props) {
    const { isShowInfo, onClickClose } = props;

    let infoviewClass = 'info-view modal';
    if (isShowInfo) infoviewClass += ' is-active';

    return (
        <div className={infoviewClass}>
            <div className="modal-background" onClick={onClickClose}></div>
            <div className="info-view__content modal-content has-text-centered">
                <div className="columns is-mobile">
                    <div className="column">
                        <a href="https://github.com/potchangelo/covid-19-tracker" target="_blank" rel="noopener noreferrer">Project Github</a>
                    </div>
                    <div className="column">
                        <a href="https://github.com/ExpDev07/coronavirus-tracker-api" target="_blank" rel="noopener noreferrer">Data API Github</a>
                    </div>
                </div>
                <p className="is-size-7">&copy; 2020 Zinglecode</p>
            </div>
            <button className="modal-close is-large" onClick={onClickClose}></button>
        </div>
    );
}

export default InfoView;