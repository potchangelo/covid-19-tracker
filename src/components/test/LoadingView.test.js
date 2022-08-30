import React from 'react';
import { render } from '@testing-library/react';
import { LoadingView } from '..';

test('LoadingView disappeared if no props passed', () => {
  const { container } = render(<LoadingView />);
  expect(container.querySelector('.loading-view')).toBeNull();
});

test('LoadingView disappeared if isShow is false', () => {
  const { container } = render(<LoadingView isShow={false} />);
  expect(container.querySelector('.loading-view')).toBeNull();
});

test('LoadingView appeared if isShow is true', () => {
  const { container } = render(<LoadingView isShow={true} />);
  expect(container.querySelector('.loading-view')).not.toBeNull();
});

test('LoadingView has no text if no label props passed', () => {
  const { container } = render(<LoadingView isShow={true} />);
  expect(container.innerText).toBeFalsy();
});

test('LoadingView has text if label props passed', () => {
  const label = 'Wait a minute';
  const { queryByText } = render(<LoadingView isShow={true} label={label} />);
  expect(queryByText(label)).toBeInTheDocument();
});
