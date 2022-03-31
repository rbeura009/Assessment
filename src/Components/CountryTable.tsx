import React, { useState, useEffect, useCallback } from 'react';
import Table from '../UIComponents/Table';
import data from '../Asset/data.json';
import formatData, { FORMATTEDCOUNTRIESDATA, COLUMN } from '../Utils/CountryTableDataFormatter';

const defaultContryTableData: FORMATTEDCOUNTRIESDATA = {
  rows: [],
  columns: []
};

function CountryTable(props) {
  const [countryTableData, setCountryTableData] = useState(defaultContryTableData);
  const [filteredCountryTableData, setFilteredCountryTableData] = useState(defaultContryTableData);
  const [sorted, setSorted] = useState(false);

  const countryFilterConfig = {
    hasFilter: true,
    hasSort: true
  };

  useEffect(() => {
    setTimeout(() => {
      let formattedData: FORMATTEDCOUNTRIESDATA = formatData(data);
      setCountryTableData(formattedData);
      setFilteredCountryTableData(formattedData);
    }, 2000);
  }, []);

  const filterHandler = useCallback(
    e => {
      let filterQuery = e.target.value.toLowerCase();
      if (!filterQuery || filterQuery === '') {
        setFilteredCountryTableData(countryTableData);
      } else {
        let data = { ...countryTableData };
        data.rows = data.rows.filter(
          row => row.name.toLowerCase().includes(filterQuery) || row.countryCode.toLowerCase().includes(filterQuery)
        );
        setFilteredCountryTableData(data);
      }
    },
    [countryTableData]
  );

  const sortHandler = useCallback(
    (e, column: COLUMN) => {
      if (column.sortable) {
        let data = { ...countryTableData };
        if (sorted) {
          data.rows = data.rows.sort((b, a) => a[column.accessor] - b[column.accessor]);
        } else {
          data.rows = data.rows.sort((a, b) => a[column.accessor] - b[column.accessor]);
        }
        setSorted(!sorted);
        setFilteredCountryTableData(data);
      }
    },
    [countryTableData, sorted]
  );

  return (
    <Table
      config={countryFilterConfig}
      rows={filteredCountryTableData.rows}
      columns={filteredCountryTableData.columns}
      filterHandler={filterHandler}
      sortHandler={sortHandler}
    />
  );
}

export default CountryTable;
