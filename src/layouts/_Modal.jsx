import { useEffect, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';

const modalPortal = document.querySelector('#modal-portal');

/**
 * @callback closeCallback
 */

/**
 * @param {object} props
 * @param {string} [props.extraClass]
 * @param {string} [props.extraContentClass]
 * @param {boolean} props.isShow
 * @param {closeCallback} props.onCloseClick
 */
function _Modal(props) {
  // Data
  const { extraClass, extraContentClass, isShow, onCloseClick, children } = props;

  // Modal
  const modal = useRef(null);

  let modalClass = 'modal is-active';
  if (!!extraClass) modalClass += ` ${extraClass}`;

  if (!modal.current) {
    modal.current = document.createElement('div');
    modal.current.className = modalClass;
  }

  // Children
  let contentClass = 'modal-content';
  if (!!extraContentClass) contentClass += ` ${extraContentClass}`;

  const childrenElements = (
    <>
      <div className="modal-background" onClick={onCloseClick}></div>
      <div className={contentClass}>{children}</div>
      <button className="modal-close is-large" onClick={onCloseClick}></button>
    </>
  );

  // Functions
  const addToPortal = useCallback(() => {
    if (!modalPortal) return;
    if (modalPortal.contains(modal.current)) return;
    modalPortal.appendChild(modal.current);
    modalPortal.classList.add('appeared');
  }, []);

  const removeFromPortal = useCallback(() => {
    if (!modalPortal) return;
    if (!modalPortal.contains(modal.current)) return;
    modalPortal.removeChild(modal.current);
    modalPortal.classList.remove('appeared');
  }, []);

  // Effects
  useEffect(() => {
    if (isShow) addToPortal();
    else removeFromPortal();
    return removeFromPortal;
  }, [isShow, addToPortal, removeFromPortal]);

  if (!isShow) return null;

  return ReactDOM.createPortal(childrenElements, modal.current);
}

export default _Modal;
