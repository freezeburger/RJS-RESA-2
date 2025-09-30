import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'

import DataGrid from './DataGrid';

describe('<DataGrid />', () => {
  test('it should mount', () => {
    render(<DataGrid />);

    const test = screen.getByTestId('DataGrid');
    console.log(test)
    expect(test).toBeInTheDocument();
  });
});