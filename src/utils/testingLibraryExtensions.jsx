import { RenderOptions, RenderResult, render } from '@testing-library/react';
import { Provider } from 'react-redux';

/**
 * Extended function of "@testing-library/react" render, integrated Redux with render
 * @param {React.ReactElement} ui
 * @param {import('redux').Store} store
 * @param {RenderOptions} [options]
 * @returns {RenderResult}
 */
function renderWithProvider(ui, store, options = {}) {
  return render(<Provider store={store}>{ui}</Provider>, options);
}

export { renderWithProvider };
