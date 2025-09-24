import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'

import Header from './Header';

describe('<Header />', () => {
  test('it should mount', () => {
    render(<Header />);

    const test = screen.getByTestId('Header');
    console.log(test)
    expect(test).toBeInTheDocument();
  });
});