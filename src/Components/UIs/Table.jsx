import React from 'react';

const Table = ({ tableName, pairName, children }) => (
  <div className="table__container">
    <h3>{tableName}</h3>
    <table>
      <tr>
        <th>
          Amounts
          {` (${pairName.length ? pairName.slice(0, 3) : ''})`}
        </th>
        <th>
          Price
          {` (${pairName.length ? pairName.slice(4) : ''})`}
        </th>
      </tr>
      {children}
    </table>
  </div>
);

export default Table;
