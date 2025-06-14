import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import './DataTable.css';

const DataTable = ({
  data = [],
  columns = [],
  sortable = true,
  filterable = true,
  paginated = true,
  pageSize = 10,
  selectable = false,
  loading = false,
  emptyMessage = "No data available",
  className = "",
  onRowClick,
  onSelectionChange
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      
      if (sortConfig.direction === 'asc') {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    });
  }, [data, sortConfig]);

  // Filtering logic
  const filteredData = useMemo(() => {
    if (!filterText) return sortedData;
    
    return sortedData.filter(row =>
      columns.some(column => {
        const value = row[column.key];
        return String(value).toLowerCase().includes(filterText.toLowerCase());
      })
    );
  }, [sortedData, filterText, columns]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    if (!paginated) return filteredData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize, paginated]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Sorting handler
  const handleSort = (key) => {
    if (!sortable) return;
    
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Selection handlers
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(new Set(paginatedData.map((_, index) => (currentPage - 1) * pageSize + index)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (rowIndex, checked) => {
    const actualIndex = (currentPage - 1) * pageSize + rowIndex;
    const newSelected = new Set(selectedRows);
    
    if (checked) {
      newSelected.add(actualIndex);
    } else {
      newSelected.delete(actualIndex);
    }
    
    setSelectedRows(newSelected);
    onSelectionChange?.(Array.from(newSelected).map(index => data[index]));
  };

  // Render cell content
  const renderCell = (row, column) => {
    if (column.render) {
      return column.render(row[column.key], row);
    }
    
    const value = row[column.key];
    
    if (value === null || value === undefined) {
      return <span className="table-cell-empty">—</span>;
    }
    
    return String(value);
  };

  // Get sort icon
  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <span className="sort-icon">↕️</span>;
    }
    return sortConfig.direction === 'asc' ? 
      <span className="sort-icon active">↑</span> : 
      <span className="sort-icon active">↓</span>;
  };

  if (loading) {
    return (
      <div className={`data-table-container ${className}`}>
        <div className="table-loading">
          <div className="loading-spinner"></div>
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`data-table-container ${className}`}>
      {/* Search/Filter */}
      {filterable && (
        <div className="table-controls">
          <div className="table-search">
            <input
              type="text"
              placeholder="Search..."
              value={filterText}
              onChange={(e) => {
                setFilterText(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          {selectable && selectedRows.size > 0 && (
            <div className="selection-info">
              {selectedRows.size} row{selectedRows.size !== 1 ? 's' : ''} selected
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {selectable && (
                <th className="select-column">
                  <input
                    type="checkbox"
                    checked={paginatedData.length > 0 && selectedRows.size === paginatedData.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
              )}
              {columns.map(column => (
                <th
                  key={column.key}
                  className={`${sortable && column.sortable !== false ? 'sortable' : ''} ${column.align ? `align-${column.align}` : ''}`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                  style={{ width: column.width }}
                >
                  <div className="th-content">
                    <span>{column.title}</span>
                    {sortable && column.sortable !== false && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="empty-row">
                  <div className="empty-state">
                    <span className="empty-icon">📋</span>
                    <p>{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr
                  key={row.id || index}
                  className={`${selectedRows.has((currentPage - 1) * pageSize + index) ? 'selected' : ''} ${onRowClick ? 'clickable' : ''}`}
                  onClick={() => onRowClick?.(row, index)}
                >
                  {selectable && (
                    <td className="select-column">
                      <input
                        type="checkbox"
                        checked={selectedRows.has((currentPage - 1) * pageSize + index)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleSelectRow(index, e.target.checked);
                        }}
                      />
                    </td>
                  )}
                  {columns.map(column => (
                    <td
                      key={column.key}
                      className={column.align ? `align-${column.align}` : ''}
                    >
                      {renderCell(row, column)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className="table-pagination">
          <div className="pagination-info">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
          </div>
          
          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ⏮️
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ◀️
            </button>
            
            <span className="pagination-current">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              ▶️
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              ⏭️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    width: PropTypes.string,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    sortable: PropTypes.bool,
    render: PropTypes.func
  })).isRequired,
  sortable: PropTypes.bool,
  filterable: PropTypes.bool,
  paginated: PropTypes.bool,
  pageSize: PropTypes.number,
  selectable: PropTypes.bool,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  className: PropTypes.string,
  onRowClick: PropTypes.func,
  onSelectionChange: PropTypes.func
};

export default DataTable;