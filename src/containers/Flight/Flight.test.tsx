import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'

import Flight from './Flight';

describe('<Flight />', () => {
  test('it should mount', () => {
    render(<Flight />);

    const test = screen.getByTestId('Flight');

    expect(test).toBeInTheDocument();
  });
});