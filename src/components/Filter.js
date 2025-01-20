// FileName: Filter.js

import React from 'react';

const Filter = ({ statusFilter, setStatusFilter, dateRange, setDateRange }) => {
  return (
    <div className="filter-container">
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="filter-select"
      >
        <option value="">All Statuses</option>
        <option value="Success">Success</option>
        <option value="Pending">Pending</option>
        <option value="Failed">Failed</option>
      </select>
      <input
        type="date"
        value={dateRange.start}
        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        className="filter-date"
      />
      <input
        type="date"
        value={dateRange.end}
        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        className="filter-date"
      />
    </div>
  );
};

export default Filter;