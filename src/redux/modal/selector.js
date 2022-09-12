import { useSelector } from "react-redux";

function useModalSelector() {
  return useSelector(state => {
    return state.modal;
  });
};

export { useModalSelector };
