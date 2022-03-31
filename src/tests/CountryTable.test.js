import React from 'react';
import { render, fireEvent, waitFor, within, screen, findByText } from '@testing-library/react';
import '@testing-library/jest-dom';

import CountryTable from '../Components/CountryTable';

test('Component load', async () => {
  render(<CountryTable />);

  const country = await screen.findByText('Russia');
  expect(country).toBeInTheDocument();
});

test('Component filter', async () => {
  render(<CountryTable />);

  const input = screen.getByTestId('input');
  fireEvent.change(input, { target: { value: 'india' } });
  expect(input.value).toBe('india');
  let tbody = await screen.findByTestId('tbody');
  expect(within(tbody).queryByText('Russia')).not.toBeInTheDocument();
});

test('Component sort order', async () => {
  render(<CountryTable />); //todo: render table component and pass props

  const input = await screen.findByTestId('sort_img');
  fireEvent.click(input);

  let tr = await screen.findAllByTestId('tr');

  //Check for sorting order
  expect(within(tr[2]).queryByText('India')).toBeInTheDocument();
  expect(within(tr[1]).queryByText('USA')).toBeInTheDocument();
  expect(within(tr[0]).queryByText('Russia')).toBeInTheDocument();
});
