import { render } from '@testing-library/react';
import React from 'react';

import { FilterView } from '..';

test('FilterView disappeared if no props passed', () => {
  const { container } = render(<FilterView />);
  expect(container.querySelector('.filter-view')).toBeNull();
});

test('FilterView disappeared if isShow is false', () => {
  const { container } = render(<FilterView isShow={false} />);
  expect(container.querySelector('.filter-view')).toBeNull();
});

test('FilterView appeared if isShow is true', () => {
  const { container } = render(<FilterView isShow={true} />);
  expect(container.querySelector('.filter-view')).not.toBeNull();
});
