import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'

import Products from './Products';

describe('<Products />', () => {
  test('it should mount', () => {
    render(<Products />);

    const test = screen.getByTestId('Products');

    expect(test).toBeInTheDocument();
  });
});