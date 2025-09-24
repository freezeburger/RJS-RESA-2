import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'

import Main from './Main';

describe('<Main />', () => {
  test('it should mount', () => {
    render(<Main />);

    const test = screen.getByTestId('Main');
    console.log(test)
    expect(test).toBeInTheDocument();
  });
});