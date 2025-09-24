import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'

import Button from './Button';

describe('<Button />', () => {
  test('it should mount', () => {
    render(<Button />);

    const test = screen.getByTestId('Button');
    console.log(test)
    expect(test).toBeInTheDocument();
  });
});