import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'

import Card from './Card';

describe('<Card />', () => {
  test('it should mount', () => {
    render(<Card />);

    const test = screen.getByTestId('Card');
    console.log(test)
    expect(test).toBeInTheDocument();
  });
});