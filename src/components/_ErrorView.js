import { useDispatch } from 'react-redux';
import { useErrorSelector } from '../redux/error/selector';
import { unsetError } from '../redux/error/slice';
import './css/errorView.scss';

function _ErrorView() {
  const error = useErrorSelector();
  const dispatch = useDispatch();

  let label = 'Something went wrong, please wait and try again.';
  if (!error) return null;
  else if (error.message === 'Network Error') {
    label = 'API network error, please wait and try again.';
  }

  return (
    <div className="error-view">
      <div className="notification is-danger">
        <button className="delete" onClick={_ => dispatch(unsetError())}></button>
        <p>
          <b>Error : </b>
          {label}
        </p>
      </div>
    </div>
  );
}

export default _ErrorView;
