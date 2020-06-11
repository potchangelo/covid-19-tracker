import * as type from './actionType';

const setModal = name => ({
    type: type.SET_MODAL,
    payload: { name }
});

const unsetModal = () => ({
    type: type.UNSET_MODAL
});

export { setModal, unsetModal }