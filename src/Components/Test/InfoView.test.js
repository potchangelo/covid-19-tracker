import React from 'react';
import { render } from '@testing-library/react';
import { InfoView } from '..';

test('InfoView disappeared if no props passed', () => {
    const { container } = render(<InfoView />);
    expect(container.querySelector('.info-view')).toBeNull();
});

test('InfoView disappeared if isShow is false', () => {
    const { container } = render(<InfoView isShow={false} />);
    expect(container.querySelector('.info-view')).toBeNull();
});

test('InfoView appeared if isShow is true', () => {
    const { container } = render(<InfoView isShow={true} />);
    expect(container.querySelector('.info-view')).not.toBeNull();
});