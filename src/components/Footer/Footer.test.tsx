import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'

import Footer from './Footer';

describe('<Footer />', () => {
  test('it should mount', () => {
    render(<Footer />);

    const test = screen.getByTestId('Footer');
    console.log(test)
    expect(test).toBeInTheDocument();
  });
});