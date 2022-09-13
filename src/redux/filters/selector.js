import { useSelector } from "react-redux";

function useFiltersSelector() {
  return useSelector(state => {
    return state.filters;
  });
};

export { useFiltersSelector };
