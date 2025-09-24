import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'

import Image from './Image';

describe('<Image />', () => {
  test('it should mount', () => {
    render(<Image />);

    const test = screen.getByTestId('Image');
    console.log(test)
    expect(test).toBeInTheDocument();
  });
});