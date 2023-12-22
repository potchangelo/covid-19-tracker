import { Loader } from 'react-feather';
import './css/loadingView.scss';

/**
 * @param {object} props
 * @param {boolean} props.isShow
 * @param {string} [props.label]
 * @param {string} [props.extraClass]
 */
function _LoadingView(props) {
  const { isShow, label, extraClass } = props;

  if (!isShow) return null;

  let labelElement = null;
  if (!!label) {
    labelElement = <span className="loading-view__label">{label}</span>;
  }

  let loadingClass = 'loading-view';
  if (!!extraClass) loadingClass += ` ${extraClass}`;

  return (
    <div className={loadingClass}>
      <span className="icon loading-icon">
        <Loader />
      </span>
      {labelElement}
    </div>
  );
}

export default _LoadingView;
