import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './DataTable.module.css';

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
  size = 'md',
  variant = 'elevated',
  onRowClick,
  onSelectionChange,
  'aria-label': ariaLabel,
  ...props
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Memo sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !data.length) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      // Handle null/undefined values
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      // Number comparison
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // Date comparison
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortConfig.direction === 'asc' ? 
          aValue.getTime() - bValue.getTime() : 
          bValue.getTime() - aValue.getTime();
      }
      
      // String comparison with locale support
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      
      if (sortConfig.direction === 'asc') {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    });
  }, [data, sortConfig]);

  // Filtering with multi-column search
  const filteredData = useMemo(() => {
    if (!filterText.trim()) return sortedData;
    
    const searchTerm = filterText.toLowerCase().trim();
    
    return sortedData.filter(row =>
      columns.some(column => {
        if (column.searchable === false) return false;
        
        const value = row[column.key];
        if (value === null || value === undefined) return false;
        
        // Handle different data types
        if (typeof value === 'number') {
          return value.toString().includes(searchTerm);
        }
        
        if (value instanceof Date) {
          return value.toLocaleDateString().toLowerCase().includes(searchTerm);
        }
        
        return String(value).toLowerCase().includes(searchTerm);
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
  const totalItems = filteredData.length;

  //  Sorting handler with animations
  const handleSort = useCallback((key) => {
    if (!sortable) return;
    
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, [sortable]);

  // selection handlers
  const handleSelectAll = useCallback((checked) => {
    if (checked) {
      // Select all visible items on current page
      const newSelected = new Set(selectedRows);
      paginatedData.forEach((row, index) => {
        const actualIndex = (currentPage - 1) * pageSize + index;
        newSelected.add(actualIndex);
      });
      setSelectedRows(newSelected);
      onSelectionChange?.(Array.from(newSelected).map(index => data[index]));
    } else {
      // Deselect all visible items on current page
      const newSelected = new Set(selectedRows);
      paginatedData.forEach((row, index) => {
        const actualIndex = (currentPage - 1) * pageSize + index;
        newSelected.delete(actualIndex);
      });
      setSelectedRows(newSelected);
      onSelectionChange?.(Array.from(newSelected).map(index => data[index]));
    }
  }, [selectedRows, paginatedData, currentPage, pageSize, data, onSelectionChange]);

  const handleSelectRow = useCallback((rowIndex, checked) => {
    const actualIndex = (currentPage - 1) * pageSize + rowIndex;
    const newSelected = new Set(selectedRows);
    
    if (checked) {
      newSelected.add(actualIndex);
    } else {
      newSelected.delete(actualIndex);
    }
    
    setSelectedRows(newSelected);
    onSelectionChange?.(Array.from(newSelected).map(index => data[index]));
  }, [selectedRows, currentPage, pageSize, data, onSelectionChange]);

  // Row click handler
  const handleRowClick = useCallback((row, index, event) => {
    // Don't trigger row click if clicking on checkbox or action buttons
    if (event.target.type === 'checkbox' || 
        event.target.closest(`.${styles.tableActions}`) ||
        event.target.closest(`.${styles.actionBtn}`)) {
      return;
    }
    
    onRowClick?.(row, index);
  }, [onRowClick]);

  // Filter handler with debouncing effect
  const handleFilterChange = useCallback((value) => {
    setFilterText(value);
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  // Cell rendering
  const renderCell = useCallback((row, column) => {
    if (column.render) {
      return column.render(row[column.key], row);
    }
    
    const value = row[column.key];
    
    if (value === null || value === undefined) {
      return <span className={styles.tableCellEmpty}>—</span>;
    }

    // Handle different data types
    if (typeof value === 'number') {
      return column.format === 'currency' ? 
        `$${value.toLocaleString()}` : 
        value.toLocaleString();
    }

    if (value instanceof Date) {
      return value.toLocaleDateString();
    }
    
    return String(value);
  }, []);

  // Sort icon with animations
  const getSortIcon = useCallback((columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <span className={styles.sortIcon}>⇅</span>;
    }
    return sortConfig.direction === 'asc' ? 
      <span className={`${styles.sortIcon} ${styles.active}`}>↑</span> : 
      <span className={`${styles.sortIcon} ${styles.active}`}>↓</span>;
  }, [sortConfig]);

  // Pagination info
  const getPaginationInfo = useCallback(() => {
    if (!paginated || totalItems === 0) return '';
    
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);
    
    return `Showing ${startItem} to ${endItem} of ${totalItems} entries`;
  }, [paginated, totalItems, currentPage, pageSize]);

  // Check if current page has all items selected
  const isAllCurrentPageSelected = useMemo(() => {
    if (paginatedData.length === 0) return false;
    
    return paginatedData.every((row, index) => {
      const actualIndex = (currentPage - 1) * pageSize + index;
      return selectedRows.has(actualIndex);
    });
  }, [paginatedData, selectedRows, currentPage, pageSize]);

  // Check if current page has some items selected
  const isSomeCurrentPageSelected = useMemo(() => {
    return paginatedData.some((row, index) => {
      const actualIndex = (currentPage - 1) * pageSize + index;
      return selectedRows.has(actualIndex);
    });
  }, [paginatedData, selectedRows, currentPage, pageSize]);

  // Container classes
  const containerClasses = [
    styles.dataTableContainer,
    styles[variant],
    styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
    className
  ].filter(Boolean).join(' ');

  if (loading) {
    return (
      <div className={containerClasses} {...props}>
        <div className={styles.tableLoading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={containerClasses}
      role="region"
      aria-label={ariaLabel || "Data table"}
      {...props}
    >
      {/* Search/Filter Controls */}
      {filterable && (
        <div className={styles.tableControls}>
          <div className={styles.tableSearch}>
            <input
              type="text"
              placeholder="Search across all columns..."
              value={filterText}
              onChange={(e) => handleFilterChange(e.target.value)}
              className={styles.searchInput}
              aria-label="Search table data"
            />
            <span className={styles.searchIcon} aria-hidden="true">🔍</span>
          </div>
          
          {selectable && selectedRows.size > 0 && (
            <div className={styles.selectionInfo} role="status" aria-live="polite">
              {selectedRows.size} row{selectedRows.size !== 1 ? 's' : ''} selected
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table 
          className={styles.dataTable}
          role="table"
          aria-label={ariaLabel || "Data table"}
        >
          <thead>
            <tr role="row">
              {selectable && (
                <th className={styles.selectColumn} role="columnheader">
                  <input
                    type="checkbox"
                    checked={isAllCurrentPageSelected}
                    ref={input => {
                      if (input) {
                        input.indeterminate = isSomeCurrentPageSelected && !isAllCurrentPageSelected;
                      }
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    aria-label="Select all visible rows"
                  />
                </th>
              )}
              {columns.map(column => (
                <th
                  key={column.key}
                  className={`
                    ${sortable && column.sortable !== false ? styles.sortable : ''}
                    ${column.align ? styles[`align${column.align.charAt(0).toUpperCase() + column.align.slice(1)}`] : ''}
                  `.trim()}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                  style={{ width: column.width }}
                  role="columnheader"
                  aria-sort={
                    sortConfig.key === column.key ? 
                      (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 
                      'none'
                  }
                >
                  <div className={styles.thContent}>
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
                <td 
                  colSpan={columns.length + (selectable ? 1 : 0)} 
                  className={styles.emptyRow}
                >
                  <div className={styles.emptyState}>
                    <span className={styles.emptyIcon} aria-hidden="true">📋</span>
                    <p>{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => {
                const actualIndex = (currentPage - 1) * pageSize + index;
                const isSelected = selectedRows.has(actualIndex);
                const isClickable = !!onRowClick;
                
                return (
                  <tr
                    key={row.id || actualIndex}
                    className={`
                      ${isSelected ? styles.selected : ''}
                      ${isClickable ? styles.clickable : ''}
                    `.trim()}
                    onClick={(e) => handleRowClick(row, actualIndex, e)}
                    role="row"
                    aria-selected={selectable ? isSelected : undefined}
                    tabIndex={isClickable ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        handleRowClick(row, actualIndex, e);
                      }
                    }}
                  >
                    {selectable && (
                      <td className={styles.selectColumn} role="gridcell">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleSelectRow(index, e.target.checked);
                          }}
                          aria-label={`Select row ${index + 1}`}
                        />
                      </td>
                    )}
                    {columns.map(column => (
                      <td
                        key={column.key}
                        className={column.align ? styles[`align${column.align.charAt(0).toUpperCase() + column.align.slice(1)}`] : ''}
                        role="gridcell"
                      >
                        {renderCell(row, column)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className={styles.tablePagination}>
          <div className={styles.paginationInfo} role="status" aria-live="polite">
            {getPaginationInfo()}
          </div>
          
          <div className={styles.paginationControls} role="navigation" aria-label="Table pagination">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className={styles.paginationBtn}
              aria-label="Go to first page"
              title="First page"
            >
              ⏮️
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={styles.paginationBtn}
              aria-label="Go to previous page"
              title="Previous page"
            >
              ◀️
            </button>
            
            <span className={styles.paginationCurrent} aria-current="page">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={styles.paginationBtn}
              aria-label="Go to next page"
              title="Next page"
            >
              ▶️
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className={styles.paginationBtn}
              aria-label="Go to last page"
              title="Last page"
            >
              ⏭️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// PropTypes
DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  
  /** Column configuration array */
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    width: PropTypes.string,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    sortable: PropTypes.bool,
    searchable: PropTypes.bool,
    format: PropTypes.oneOf(['currency', 'number', 'date']),
    render: PropTypes.func
  })).isRequired,
  
  /** Enable sorting functionality */
  sortable: PropTypes.bool,
  
  /** Enable filtering/search functionality */
  filterable: PropTypes.bool,
  
  /** Enable pagination */
  paginated: PropTypes.bool,
  
  /** Number of items per page */
  pageSize: PropTypes.number,
  
  /** Enable row selection */
  selectable: PropTypes.bool,
  
  /** Loading state */
  loading: PropTypes.bool,
  
  /** Message to show when no data */
  emptyMessage: PropTypes.string,
  
  /** Additional CSS classes */
  className: PropTypes.string,
  
  /** Table size variant */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  
  /** Visual variant */
  variant: PropTypes.oneOf(['elevated', 'outlined', 'filled']),
  
  /** Row click handler */
  onRowClick: PropTypes.func,
  
  /** Selection change handler */
  onSelectionChange: PropTypes.func,
  
  /** Accessible label */
  'aria-label': PropTypes.string,
};

export default DataTable;