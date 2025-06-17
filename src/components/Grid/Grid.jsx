import React from 'react';
import PropTypes from 'prop-types';
import styles from './Grid.module.css';

// Grid Item Component
const GridItem = ({
  children,
  colSpan = 1,
  rowSpan = 1,
  color = 'blue',
  gradient = false,
  pattern = 'none',
  size = 'md',
  interactive = false,
  effect = 'none',
  className = '',
  onClick,
  onKeyDown,
  style = {},
  'aria-label': ariaLabel,
  role,
  tabIndex,
  ...props
}) => {
  const itemClasses = [
    styles.gridItem,
    styles[`gridItem${color.charAt(0).toUpperCase() + color.slice(1)}`],
    styles[`gridItem${size.charAt(0).toUpperCase() + size.slice(1)}`],
    gradient && styles.gridItemGradient,
    pattern !== 'none' && styles[`gridItemPattern${pattern.charAt(0).toUpperCase() + pattern.slice(1)}`],
    interactive && styles.gridItemInteractive,
    effect !== 'none' && styles[`gridItem${effect.charAt(0).toUpperCase() + effect.slice(1)}`],
    className
  ].filter(Boolean).join(' ');

  const itemStyle = {
    gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined,
    gridRow: rowSpan > 1 ? `span ${rowSpan}` : undefined,
    ...style
  };

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = (event) => {
    if (interactive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleClick(event);
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  return (
    <div
      className={itemClasses}
      style={itemStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={interactive ? (role || 'button') : role}
      tabIndex={interactive ? (tabIndex !== undefined ? tabIndex : 0) : tabIndex}
      aria-label={ariaLabel}
      data-testid="grid-item"
      {...props}
    >
      <div className={styles.gridItemContent}>
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
  gap = 'md',
  minItemWidth = '200px',
  responsive = true,
  variant = 'default',
  className = '',
  style = {},
  'aria-label': ariaLabel,
  ...props
}) => {
  const gridClasses = [
    styles.gridContainer,
    styles[`gridContainer${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    responsive && styles.gridContainerResponsive,
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

  const getGapValue = () => {
    const gapMap = {
      xs: 'var(--space-2)',
      sm: 'var(--space-3)',
      md: 'var(--space-4)',
      lg: 'var(--space-6)',
      xl: 'var(--space-8)'
    };
    return gapMap[gap] || gap;
  };

  const gridStyle = {
    gridTemplateColumns: getGridColumns(),
    gridTemplateRows: getGridRows(),
    gap: getGapValue(),
    ...style
  };

  return (
    <div 
      className={gridClasses} 
      style={gridStyle} 
      role="grid"
      aria-label={ariaLabel || "Grid layout"}
      data-testid="grid-container"
      {...props}
    >
      {children}
    </div>
  );
};

// Masonry Grid Component
const MasonryGrid = ({
  children,
  columns = 3,
  gap = 'md',
  className = '',
  breakpoints = {
    768: 2,
    480: 1
  },
  'aria-label': ariaLabel,
  ...props
}) => {
  const masonryClasses = [
    styles.masonryGrid,
    className
  ].filter(Boolean).join(' ');

  const getGapValue = () => {
    const gapMap = {
      xs: 'var(--space-2)',
      sm: 'var(--space-3)',
      md: 'var(--space-4)',
      lg: 'var(--space-6)',
      xl: 'var(--space-8)'
    };
    return gapMap[gap] || gap;
  };

  const masonryStyle = {
    columnCount: columns,
    columnGap: getGapValue(),
    ...props.style
  };

  return (
    <div 
      className={masonryClasses} 
      style={masonryStyle}
      role="grid"
      aria-label={ariaLabel || "Masonry grid layout"}
      data-testid="masonry-grid"
    >
      {React.Children.map(children, (child, index) => (
        <div key={index} className={styles.masonryItem}>
          {child}
        </div>
      ))}
    </div>
  );
};

// Dashboard Grid Component
const DashboardGrid = ({
  children,
  layout = 'default',
  gap = 'md',
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const dashboardClasses = [
    styles.dashboardGrid,
    styles[`dashboardGrid${layout.charAt(0).toUpperCase() + layout.slice(1)}`],
    className
  ].filter(Boolean).join(' ');

  const getGapValue = () => {
    const gapMap = {
      xs: 'var(--space-2)',
      sm: 'var(--space-3)',
      md: 'var(--space-4)',
      lg: 'var(--space-6)',
      xl: 'var(--space-8)'
    };
    return gapMap[gap] || gap;
  };

  return (
    <div 
      className={dashboardClasses} 
      style={{ gap: getGapValue() }} 
      role="grid"
      aria-label={ariaLabel || `${layout} dashboard layout`}
      data-testid="dashboard-grid"
      {...props}
    >
      {children}
    </div>
  );
};

// Grid Area Component for Dashboard layouts
const GridArea = ({
  children,
  area,
  className = '',
  ...props
}) => {
  const areaClasses = [
    styles[`gridArea${area.charAt(0).toUpperCase() + area.slice(1)}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={areaClasses} {...props}>
      {children}
    </div>
  );
};

// PropTypes
GridItem.propTypes = {
  /** Content to display in the grid item */
  children: PropTypes.node,
  
  /** Number of columns to span */
  colSpan: PropTypes.number,
  
  /** Number of rows to span */
  rowSpan: PropTypes.number,
  
  /** Color variant */
  color: PropTypes.oneOf([
    'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 
    'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 
    'rose', 'gray', 'slate', 'zinc', 'neutral', 'stone'
  ]),
  
  /** Enable gradient animation */
  gradient: PropTypes.bool,
  
  /** Pattern overlay */
  pattern: PropTypes.oneOf(['none', 'dots', 'lines', 'grid', 'diagonal', 'waves']),
  
  /** Size variant */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  
  /** Enable interactive behavior */
  interactive: PropTypes.bool,
  
  /** Special visual effects */
  effect: PropTypes.oneOf(['none', 'glow', 'pulse', 'bounce', 'float', 'rotate', 'glass', 'neon']),
  
  /** Additional CSS classes */
  className: PropTypes.string,
  
  /** Click handler */
  onClick: PropTypes.func,
  
  /** Key down handler */
  onKeyDown: PropTypes.func,
  
  /** Inline styles */
  style: PropTypes.object,
  
  /** Accessible label */
  'aria-label': PropTypes.string,
  
  /** ARIA role */
  role: PropTypes.string,
  
  /** Tab index for focus management */
  tabIndex: PropTypes.number
};

Grid.propTypes = {
  /** Grid content */
  children: PropTypes.node.isRequired,
  
  /** Number of columns or CSS grid value */
  columns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  
  /** Number of rows or CSS grid value */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  
  /** Gap between grid items */
  gap: PropTypes.oneOfType([
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    PropTypes.string
  ]),
  
  /** Minimum width for auto-fit columns */
  minItemWidth: PropTypes.string,
  
  /** Enable responsive behavior */
  responsive: PropTypes.bool,
  
  /** Grid container variant */
  variant: PropTypes.oneOf(['default', 'padded', 'bordered', 'rounded']),
  
  /** Additional CSS classes */
  className: PropTypes.string,
  
  /** Inline styles */
  style: PropTypes.object,
  
  /** Accessible label */
  'aria-label': PropTypes.string
};

MasonryGrid.propTypes = {
  /** Grid content */
  children: PropTypes.node.isRequired,
  
  /** Number of columns */
  columns: PropTypes.number,
  
  /** Gap between items */
  gap: PropTypes.oneOfType([
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    PropTypes.string
  ]),
  
  /** Additional CSS classes */
  className: PropTypes.string,
  
  /** Responsive breakpoints */
  breakpoints: PropTypes.object,
  
  /** Accessible label */
  'aria-label': PropTypes.string
};

DashboardGrid.propTypes = {
  /** Grid content */
  children: PropTypes.node.isRequired,
  
  /** Dashboard layout template */
  layout: PropTypes.oneOf(['default', 'sidebar', 'header', 'complex']),
  
  /** Gap between grid areas */
  gap: PropTypes.oneOfType([
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    PropTypes.string
  ]),
  
  /** Additional CSS classes */
  className: PropTypes.string,
  
  /** Accessible label */
  'aria-label': PropTypes.string
};

GridArea.propTypes = {
  /** Content for the grid area */
  children: PropTypes.node.isRequired,
  
  /** Grid area name */
  area: PropTypes.oneOf(['header', 'sidebar', 'nav', 'main', 'aside', 'hero', 'footer']).isRequired,
  
  /** Additional CSS classes */
  className: PropTypes.string
};

// Attach subcomponents to main Grid component
Grid.Item = GridItem;
Grid.Masonry = MasonryGrid;
Grid.Dashboard = DashboardGrid;
Grid.Area = GridArea;

// Export components
export { GridItem, MasonryGrid, DashboardGrid, GridArea };
export default Grid;