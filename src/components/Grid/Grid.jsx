import React from 'react';
import PropTypes from 'prop-types';
import './Grid.css';

// Grid Item Component
const GridItem = ({
  children,
  colSpan = 1,
  rowSpan = 1,
  color = 'blue',
  gradient = false,
  pattern = 'none',
  size = 'medium',
  interactive = false,
  className = '',
  onClick,
  style = {},
  ...props
}) => {
  const itemClasses = [
    'grid-item',
    `grid-item--${color}`,
    `grid-item--${size}`,
    gradient && 'grid-item--gradient',
    pattern !== 'none' && `grid-item--pattern-${pattern}`,
    interactive && 'grid-item--interactive',
    className
  ].filter(Boolean).join(' ');

  const itemStyle = {
    gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined,
    gridRow: rowSpan > 1 ? `span ${rowSpan}` : undefined,
    ...style
  };

  return (
    <div
      className={itemClasses}
      style={itemStyle}
      onClick={onClick}
      {...props}
    >
      <div className="grid-item-content">
        {children}
      </div>
    </div>
  );
};

// Main Grid Component
const Grid = ({
  children,
  columns = 'auto',
  rows = 'auto',
  gap = '1rem',
  minItemWidth = '200px',
  responsive = true,
  variant = 'default',
  className = '',
  style = {},
  ...props
}) => {
  const gridClasses = [
    'grid-container',
    `grid-container--${variant}`,
    responsive && 'grid-container--responsive',
    className
  ].filter(Boolean).join(' ');

  const getGridColumns = () => {
    if (typeof columns === 'number') {
      return `repeat(${columns}, 1fr)`;
    }
    if (columns === 'auto') {
      return `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`;
    }
    return columns;
  };

  const getGridRows = () => {
    if (typeof rows === 'number') {
      return `repeat(${rows}, 1fr)`;
    }
    if (rows === 'auto') {
      return 'auto';
    }
    return rows;
  };

  const gridStyle = {
    gridTemplateColumns: getGridColumns(),
    gridTemplateRows: getGridRows(),
    gap: gap,
    ...style
  };

  return (
    <div className={gridClasses} style={gridStyle} {...props}>
      {children}
    </div>
  );
};

// Masonry Grid Component (Pinterest-style)
const MasonryGrid = ({
  children,
  columns = 3,
  gap = '1rem',
  className = '',
  ...props
}) => {
  const masonryClasses = [
    'masonry-grid',
    className
  ].filter(Boolean).join(' ');

  const masonryStyle = {
    columnCount: columns,
    columnGap: gap,
    ...props.style
  };

  return (
    <div className={masonryClasses} style={masonryStyle}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className="masonry-item">
          {child}
        </div>
      ))}
    </div>
  );
};

// Dashboard Grid Component (Fixed layouts)
const DashboardGrid = ({
  children,
  layout = 'default',
  gap = '1rem',
  className = '',
  ...props
}) => {
  const dashboardClasses = [
    'dashboard-grid',
    `dashboard-grid--${layout}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={dashboardClasses} style={{ gap }} {...props}>
      {children}
    </div>
  );
};

// PropTypes
GridItem.propTypes = {
  children: PropTypes.node,
  colSpan: PropTypes.number,
  rowSpan: PropTypes.number,
  color: PropTypes.oneOf([
    'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 
    'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 
    'rose', 'gray', 'slate', 'zinc', 'neutral', 'stone'
  ]),
  gradient: PropTypes.bool,
  pattern: PropTypes.oneOf(['none', 'dots', 'lines', 'grid', 'diagonal', 'waves']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  interactive: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object
};

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  gap: PropTypes.string,
  minItemWidth: PropTypes.string,
  responsive: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'padded', 'bordered', 'rounded']),
  className: PropTypes.string,
  style: PropTypes.object
};

MasonryGrid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.number,
  gap: PropTypes.string,
  className: PropTypes.string
};

DashboardGrid.propTypes = {
  children: PropTypes.node.isRequired,
  layout: PropTypes.oneOf(['default', 'sidebar', 'header', 'complex']),
  gap: PropTypes.string,
  className: PropTypes.string
};

// Export all components
Grid.Item = GridItem;
Grid.Masonry = MasonryGrid;
Grid.Dashboard = DashboardGrid;

export { GridItem, MasonryGrid, DashboardGrid };
export default Grid;