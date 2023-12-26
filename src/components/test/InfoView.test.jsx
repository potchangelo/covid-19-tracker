import React from 'react';
import { test, expect } from 'vitest';
import { InfoView } from '../index.js';
import { MODAL_INFO } from '../../redux/modal/name';
import { setModal } from '../../redux/modal/slice';
import store from '../../redux/store.js';
import { renderWithProvider } from '../../utils/testingLibraryExtensions.jsx';

test('InfoView is invisible if modal is unset', () => {
  const { queryByText } = renderWithProvider(<InfoView />, store);
  expect(queryByText(/copyright/i)).toBeNull();
});

test('InfoView is visible if modal is set', async () => {
  store.dispatch(setModal(MODAL_INFO));
  const { getByText } = renderWithProvider(<InfoView />, store);
  expect(getByText(/copyright/i)).not.toBeNull();
});
