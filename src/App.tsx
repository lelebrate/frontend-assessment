import React from 'react';
import './App.css';
import { Country, countries } from './countries';

function App() {
  const [sortField, setSortField] = React.useState<keyof Country | null>(null);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc' | null>(null);

  const sortedCountries = [...countries].sort((a, b) => {
    if (!sortField) return 0;

    if (a[sortField] < b[sortField]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const onHeaderClick = (field: keyof Country) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Define the keys you want to display in the table
  const keysToShow = ['country', 'population', 'deaths', 'recovered', 'lat', 'lng'];

  return (
    <table>
      <thead>
        <tr>
          {keysToShow.map((key) => (
            <th
              key={key}
              style={{ textTransform: 'capitalize' }}
              onClick={() => onHeaderClick(key as keyof Country)}
            >
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedCountries.map((country, i) => (
          <tr key={i}>
            {keysToShow.map((key, j) => (
              <td key={j}>{country[key as keyof Country]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default App;
