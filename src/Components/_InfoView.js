import './Css/InfoView.scss';

import React from 'react';
import { connect } from 'react-redux';

import { Modal } from '../Layouts';

import { unsetModal } from '../Redux/Modal/action';
import { INFO } from '../Redux/Modal/name';

function InfoView(props) {
    const { isShow, unsetModal } = props;
    return (
        <Modal 
            extraClass="info-view" 
            extraContentClass="info-view__content has-text-centered"
            isShow={isShow} 
            onClickClose={unsetModal}
            >
            <div className="columns is-mobile">
                <div className="column">
                    <a href="https://github.com/potchangelo/covid-19-tracker" target="_blank" rel="noopener noreferrer">Project Github</a>
                </div>
                <div className="column">
                    <a href="https://github.com/ExpDev07/coronavirus-tracker-api" target="_blank" rel="noopener noreferrer">Data API Github</a>
                </div>
            </div>
            <p className="is-size-7">&copy; 2020 Zinglecode</p>
        </Modal>
    );
}

function mapStateToProps(state) {
    const isShow = state.modalReducer === INFO;
    return { isShow };
}

const mapDispatchToProps = { unsetModal };

export default connect(mapStateToProps, mapDispatchToProps)(InfoView);