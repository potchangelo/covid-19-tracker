import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../layouts';
import { MODAL_INFO } from '../redux/modal/name';
import { useModalSelector } from '../redux/modal/selector';
import { unsetModal } from '../redux/modal/slice';
import './css/infoView.scss';

function InfoView() {
  const { name } = useModalSelector();
  const dispatch = useDispatch();
  const isShow = name === MODAL_INFO;
  // TODO : Unset modal
  return (
    <Modal
      extraClass="info-view"
      extraContentClass="info-view__content"
      isShow={isShow}
      onClickClose={() => dispatch(unsetModal())}
    >
      <div className="content">
        <h6 className="title is-6">Marker colors</h6>
        <p>
          <span className="info-view__color-marker pink"></span>
          <span className="info-view__color-text">0 - 100,000 confirmed cases.</span>
        </p>
        <p>
          <span className="info-view__color-marker purple"></span>
          <span className="info-view__color-text">100,001 - 1,000,000 confirmed cases.</span>
        </p>
        <p>
          <span className="info-view__color-marker red"></span>
          <span className="info-view__color-text">1,000,001+ confirmed cases.</span>
        </p>
      </div>
      <div className="content">
        <h6 className="title is-6">Links</h6>
        <p>
          <a
            href="https://github.com/potchangelo/covid-19-tracker"
            target="_blank"
            rel="noopener noreferrer"
          >
            Project Github
          </a>
        </p>
        <p>
          <a
            href="https://github.com/ExpDev07/coronavirus-tracker-api"
            target="_blank"
            rel="noopener noreferrer"
          >
            Data API Github
          </a>
        </p>
      </div>
      <p className="is-size-7">&copy; Copyright {new Date().getFullYear()} Zinglecode.</p>
    </Modal>
  );
}

export default InfoView;
