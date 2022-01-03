import './Css/InfoView.scss';

import React from 'react';
import { connect } from 'react-redux';

import { Modal } from '../layouts';

import { unsetModal } from '../Redux/Modal/action';
import { INFO } from '../Redux/Modal/name';

function InfoView(props) {
  const { isShow, unsetModal } = props;
  return (
    <Modal extraClass="info-view" extraContentClass="info-view__content" isShow={isShow} onClickClose={unsetModal}>
      <div className="content">
        <h6 className="title is-6">Marker colors</h6>
        <p>
          <span className="info-view__color-marker pink"></span>
          <span className="info-view__color-text">0 - 50,000 confirmed cases.</span>
        </p>
        <p>
          <span className="info-view__color-marker purple"></span>
          <span className="info-view__color-text">50,001 - 500,000 confirmed cases.</span>
        </p>
        <p>
          <span className="info-view__color-marker red"></span>
          <span className="info-view__color-text">500,001+ confirmed cases.</span>
        </p>
      </div>
      <div className="content">
        <h6 className="title is-6">Links</h6>
        <p>
          <a href="https://github.com/potchangelo/covid-19-tracker" target="_blank" rel="noopener noreferrer">
            Project Github
          </a>
        </p>
        <p>
          <a href="https://github.com/ExpDev07/coronavirus-tracker-api" target="_blank" rel="noopener noreferrer">
            Data API Github
          </a>
        </p>
      </div>
      <p className="is-size-7">&copy; Copyright 2021 Zinglecode.</p>
    </Modal>
  );
}

function mapStateToProps(state) {
  const isShow = state.modalReducer === INFO;
  return { isShow };
}

const mapDispatchToProps = { unsetModal };

export default connect(mapStateToProps, mapDispatchToProps)(InfoView);
