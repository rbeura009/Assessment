import React, { useState } from 'react';
import sortIcon from '../Asset/images/sort.png';
import Input from './Input';

function Table({ rows, columns, filterHandler, sortHandler, config }) {
  return (
    <>
      {config.hasFilter && (
        <div className="table-filter">
          <Input type="text" changeHandler={filterHandler} />
        </div>
      )}

      <table className="country-table" data-testid="tbody">
        <thead>
          <tr>
            {columns.map(column => {
              return (
                <th key={column.accessor} onClick={e => sortHandler(e, column)}>
                  {column.label}
                  {column.sortable ? (
                    <img data-testid="sort_img" height={16} width={16} src={sortIcon} alt="sort-icon" />
                  ) : null}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => {
            return (
              <tr key={row.id} data-testid="tr">
                {columns.map(column => {
                  if (column.format) {
                    return <td key={column.accessor}>{column.format(row[column.accessor])}</td>;
                  }
                  return <td key={column.accessor}>{row[column.accessor]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
