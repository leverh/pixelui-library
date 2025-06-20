import { useState, useRef, useEffect } from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({
  items = [],
  collapsed = false,
  onCollapsedChange,
  variant = 'default', // 'default', 'floating', 'minimal'
  position = 'left', // 'left', 'right'
  showSearch = true,
  showToggle = true,
  activeItem = null,
  onItemClick,
  onSearch,
  width = 280,
  collapsedWidth = 80,
  className = '',
  overlay = false,
  onOverlayClick,
  searchPlaceholder = 'Search menu...',
  logo,
  footer
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [hoveredItem, setHoveredItem] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const sidebarRef = useRef(null);
  const searchInputRef = useRef(null);

  const filterItems = (items, term) => {
    if (!term) return items;
    
    const filtered = [];
    items.forEach(item => {
      const matchesSearch = item.label?.toLowerCase().includes(term.toLowerCase()) ||
                           item.description?.toLowerCase().includes(term.toLowerCase());
      
      if (matchesSearch) {
        filtered.push(item);
      } else if (item.children) {
        const filteredChildren = filterItems(item.children, term);
        if (filteredChildren.length > 0) {
          filtered.push({ ...item, children: filteredChildren });
        }
      }
    });
    
    return filtered;
  };

  const filteredItems = filterItems(items, searchTerm);

  useEffect(() => {
    if (searchTerm) {
      const expandAll = (items) => {
        const toExpand = new Set();
        items.forEach(item => {
          if (item.children && item.children.length > 0) {
            toExpand.add(item.id);
            expandAll(item.children);
          }
        });
        return toExpand;
      };
      setExpandedItems(expandAll(filteredItems));
    }
  }, [searchTerm, filteredItems]);

  const handleToggleCollapse = () => {
    setIsAnimating(true);
    onCollapsedChange?.(!collapsed);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleItemClick = (item, event) => {
    event.preventDefault();
    
    if (item.children && item.children.length > 0) {
      const newExpanded = new Set(expandedItems);
      if (newExpanded.has(item.id)) {
        newExpanded.delete(item.id);
      } else {
        newExpanded.add(item.id);
      }
      setExpandedItems(newExpanded);
    } else {
      onItemClick?.(item, event);
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch?.(term);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSearchTerm('');
      searchInputRef.current?.blur();
    }
  };

  const isItemActive = (item) => {
    if (typeof activeItem === 'string') {
      return item.id === activeItem;
    }
    if (typeof activeItem === 'object' && activeItem?.id) {
      return item.id === activeItem.id;
    }
    return false;
  };

  const hasActiveChild = (item) => {
    if (!item.children) return false;
    return item.children.some(child => 
      isItemActive(child) || hasActiveChild(child)
    );
  };

  const renderMenuItem = (item, level = 0) => {
    const isActive = isItemActive(item);
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isHovered = hoveredItem === item.id;
    const hasActiveDescendant = hasActiveChild(item);

    return (
      <div key={item.id} className={styles.menuItemWrapper}>
        <div
          className={`
            ${styles.menuItem}
            ${isActive ? styles.menuItemActive : ''}
            ${hasActiveDescendant ? styles.menuItemHasActive : ''}
            ${item.disabled ? styles.menuItemDisabled : ''}
            ${collapsed && level === 0 ? styles.menuItemCollapsed : ''}
            ${isHovered ? styles.menuItemHovered : ''}
            ${isAnimating ? styles.menuItemAnimating : ''}
          `}
          style={{
            paddingLeft: collapsed && level === 0 ? undefined : `${1 + level * 1.5}rem`
          }}
          onClick={(e) => !item.disabled && handleItemClick(item, e)}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
          role="menuitem"
          tabIndex={item.disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              !item.disabled && handleItemClick(item, e);
            }
          }}
        >
          {/* Icon with animations */}
          {item.icon && (
            <div className={`
              ${styles.menuIcon} 
              ${hasChildren && isExpanded ? styles.menuIconExpanded : ''}
              ${isActive ? styles.menuIconActive : ''}
            `}>
              {item.icon}
            </div>
          )}

          {/* Content with transitions */}
          {!collapsed && (
            <div className={styles.menuContent}>
              <div className={styles.menuLabel}>
                {item.label}
              </div>
              {item.description && (
                <div className={styles.menuDescription}>
                  {item.description}
                </div>
              )}
            </div>
          )}

          {/* Badge with animations */}
          {!collapsed && item.badge && (
            <div className={`
              ${styles.menuBadge}
              ${isActive ? styles.menuBadgeActive : ''}
              ${typeof item.badge === 'number' && item.badge > 0 ? styles.menuBadgePulse : ''}
              ${item.badge === 'New' ? styles.menuBadgeNew : ''}
            `}>
              {item.badge}
            </div>
          )}

          {/* Arrow with rotation */}
          {!collapsed && hasChildren && (
            <div className={`
              ${styles.menuArrow} 
              ${isExpanded ? styles.menuArrowExpanded : ''}
              ${isActive ? styles.menuArrowActive : ''}
            `}>
              ▶
            </div>
          )}

          {/* Glowing Active Indicator */}
          {isActive && (
            <div className={styles.activeIndicator} />
          )}
        </div>

        {/* Hover Tooltip for Collapsed State */}
        {collapsed && level === 0 && isHovered && (
          <div className={styles.hoverTooltip}>
            <div className={styles.tooltipContent}>
              <div className={styles.tooltipLabel}>{item.label}</div>
              {item.description && (
                <div className={styles.tooltipDescription}>{item.description}</div>
              )}
            </div>
            {hasChildren && (
              <div className={styles.tooltipSubmenu}>
                {item.children.map(child => (
                  <div
                    key={child.id}
                    className={`
                      ${styles.tooltipMenuItem} 
                      ${isItemActive(child) ? styles.tooltipMenuItemActive : ''}
                    `}
                    onClick={(e) => !child.disabled && handleItemClick(child, e)}
                  >
                    {child.icon && <span className={styles.tooltipMenuIcon}>{child.icon}</span>}
                    <span className={styles.tooltipMenuLabel}>{child.label}</span>
                    {child.badge && (
                      <span className={styles.tooltipMenuBadge}>{child.badge}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Submenu with staggered animations */}
        {!collapsed && hasChildren && isExpanded && (
          <div className={styles.submenu}>
            {item.children.map((child, index) => (
              <div
                key={child.id}
                className={styles.submenuItem}
                style={{
                  animationDelay: `${index * 0.05}s`
                }}
              >
                {renderMenuItem(child, level + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Glassmorphism Overlay */}
      {overlay && (
        <div 
          className={styles.overlay}
          onClick={onOverlayClick}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          ${styles.sidebar}
          ${styles[variant]}
          ${styles[position]}
          ${collapsed ? styles.collapsed : styles.expanded}
          ${overlay ? styles.withOverlay : ''}
          ${isAnimating ? styles.animating : ''}
          ${className}
        `}
        style={{
          width: collapsed ? `${collapsedWidth}px` : `${width}px`,
        }}
      >
        {/* Header */}
        <div className={styles.sidebarHeader}>
          {/* Logo with smooth scaling */}
          {logo && (
            <div className={`${styles.logo} ${collapsed ? styles.logoCollapsed : ''}`}>
              {logo}
            </div>
          )}

          {/* Toggle Button */}
          {showToggle && (
            <button
              className={styles.toggleButton}
              onClick={handleToggleCollapse}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <div className={`${styles.toggleIcon} ${collapsed ? styles.toggleIconCollapsed : ''}`}>
                ◀
              </div>
            </button>
          )}
        </div>

        {/* Search */}
        {showSearch && !collapsed && (
          <div className={styles.searchContainer}>
            <div className={`${styles.searchWrapper} ${searchFocused ? styles.searchFocused : ''}`}>
              <input
                ref={searchInputRef}
                type="text"
                className={styles.searchInput}
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              {searchTerm && (
                <button
                  className={styles.searchClear}
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className={styles.navigation}>
          <div className={styles.menuList}>
            {filteredItems.length === 0 ? (
              <div className={styles.emptyState}>
                {searchTerm ? '🔍 No results found' : 'No menu items'}
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className={styles.menuItemContainer}
                  style={{
                    animationDelay: `${index * 0.05}s`
                  }}
                >
                  {renderMenuItem(item)}
                </div>
              ))
            )}
          </div>
        </nav>

        {/* Footer */}
        {footer && !collapsed && (
          <div className={styles.sidebarFooter}>
            {footer}
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;