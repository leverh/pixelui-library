import { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';

const Header = ({
  logo,
  navigation = [],
  breadcrumbs = [],
  showSearch = true,
  showNotifications = true,
  showProfile = true,
  showThemeToggle = true,
  notifications = [],
  user = null,
  variant = 'default', // 'default', 'floating', 'minimal', 'glass'
  position = 'sticky', // 'static', 'sticky', 'fixed'
  onMenuToggle,
  onSearch,
  onNotificationClick,
  onProfileClick,
  onThemeToggle,
  onCommandPalette,
  theme = 'light',
  searchPlaceholder = 'Search or press ⌘K...',
  className = ''
}) => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const searchInputRef = useRef(null);
  const headerRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  // Scroll for sticky header effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Command palette keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
        onCommandPalette?.();
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
        setSearchExpanded(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCommandPalette]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    setSearchExpanded(true);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearchBlur = () => {
    if (!searchValue) {
      setSearchExpanded(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    onMenuToggle?.(!mobileMenuOpen);
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Command Palette Overlay */}
      {commandPaletteOpen && (
        <div className={styles.commandOverlay} onClick={() => setCommandPaletteOpen(false)}>
          <div className={styles.commandPalette} onClick={(e) => e.stopPropagation()}>
            <div className={styles.commandHeader}>
              <input
                type="text"
                placeholder="Type a command or search..."
                className={styles.commandInput}
                autoFocus
              />
              <div className={styles.commandShortcut}>ESC</div>
            </div>
            <div className={styles.commandResults}>
              <div className={styles.commandSection}>
                <div className={styles.commandSectionTitle}>Quick Actions</div>
                <div className={styles.commandItem}>
                  <span className={styles.commandIcon}>⚡</span>
                  <span>Create new project</span>
                  <kbd className={styles.commandKbd}>⌘N</kbd>
                </div>
                <div className={styles.commandItem}>
                  <span className={styles.commandIcon}>👥</span>
                  <span>Invite team member</span>
                  <kbd className={styles.commandKbd}>⌘I</kbd>
                </div>
                <div className={styles.commandItem}>
                  <span className={styles.commandIcon}>📊</span>
                  <span>View analytics</span>
                  <kbd className={styles.commandKbd}>⌘A</kbd>
                </div>
              </div>
              <div className={styles.commandSection}>
                <div className={styles.commandSectionTitle}>Navigation</div>
                <div className={styles.commandItem}>
                  <span className={styles.commandIcon}>🏠</span>
                  <span>Go to Dashboard</span>
                </div>
                <div className={styles.commandItem}>
                  <span className={styles.commandIcon}>⚙️</span>
                  <span>Open Settings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header
        ref={headerRef}
        className={`
          ${styles.header}
          ${styles[variant]}
          ${styles[position]}
          ${scrolled ? styles.scrolled : ''}
          ${className}
        `}
      >
        <div className={styles.headerContent}>
          {/* Left Section */}
          <div className={styles.headerLeft}>
            {/* Mobile Menu Toggle */}
            <button
              className={`${styles.mobileMenuToggle} ${mobileMenuOpen ? styles.mobileMenuToggleOpen : ''}`}
              onClick={handleMobileMenuToggle}
              aria-label="Toggle mobile menu"
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </button>

            {/* Logo */}
            {logo && (
              <div className={styles.logo}>
                {logo}
              </div>
            )}

            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
              <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className={styles.breadcrumbItem}>
                    {index > 0 && <span className={styles.breadcrumbSeparator}>▶</span>}
                    {crumb.href ? (
                      <a href={crumb.href} className={styles.breadcrumbLink}>
                        {crumb.icon && <span className={styles.breadcrumbIcon}>{crumb.icon}</span>}
                        {crumb.label}
                      </a>
                    ) : (
                      <span className={styles.breadcrumbCurrent}>
                        {crumb.icon && <span className={styles.breadcrumbIcon}>{crumb.icon}</span>}
                        {crumb.label}
                      </span>
                    )}
                  </div>
                ))}
              </nav>
            )}

            {/* Desktop Navigation */}
            {navigation.length > 0 && (
              <nav className={styles.desktopNavigation}>
                {navigation.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className={`${styles.navItem} ${item.active ? styles.navItemActive : ''}`}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick(item);
                      }
                    }}
                  >
                    {item.icon && <span className={styles.navIcon}>{item.icon}</span>}
                    {item.label}
                    {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
                  </a>
                ))}
              </nav>
            )}
          </div>

          {/* Right Section */}
          <div className={styles.headerRight}>
            {/* Search */}
            {showSearch && (
              <div className={`${styles.searchContainer} ${searchExpanded ? styles.searchExpanded : ''}`}>
                <div className={styles.searchWrapper}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    className={styles.searchInput}
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={handleSearchChange}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                  />
                  <button
                    className={styles.searchButton}
                    onClick={handleSearchFocus}
                    aria-label="Search"
                  >
                    🔍
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className={styles.headerActions}>
              {/* Theme Toggle */}
              {showThemeToggle && (
                <button
                  className={styles.actionButton}
                  onClick={() => onThemeToggle?.(theme === 'light' ? 'dark' : 'light')}
                  aria-label="Toggle theme"
                >
                  <div className={styles.themeToggle}>
                    <div className={`${styles.themeIcon} ${theme === 'light' ? styles.themeIconActive : ''}`}>
                      ☀️
                    </div>
                    <div className={`${styles.themeIcon} ${theme === 'dark' ? styles.themeIconActive : ''}`}>
                      🌙
                    </div>
                  </div>
                </button>
              )}

              {/* Notifications */}
              {showNotifications && (
                <div className={styles.dropdown} ref={notificationsRef}>
                  <button
                    className={`${styles.actionButton} ${notificationsOpen ? styles.actionButtonActive : ''}`}
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    aria-label="Notifications"
                  >
                    🔔
                    {unreadNotifications > 0 && (
                      <span className={styles.notificationBadge}>
                        {unreadNotifications > 99 ? '99+' : unreadNotifications}
                      </span>
                    )}
                  </button>

                  {notificationsOpen && (
                    <div className={styles.dropdownPanel}>
                      <div className={styles.dropdownHeader}>
                        <h3>Notifications</h3>
                        {unreadNotifications > 0 && (
                          <button className={styles.markAllRead}>
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className={styles.notificationsList}>
                        {notifications.length === 0 ? (
                          <div className={styles.emptyNotifications}>
                            <span className={styles.emptyIcon}>📭</span>
                            <p>No notifications yet</p>
                          </div>
                        ) : (
                          notifications.slice(0, 5).map((notification, index) => (
                            <div
                              key={index}
                              className={`${styles.notificationItem} ${!notification.read ? styles.notificationUnread : ''}`}
                              onClick={() => onNotificationClick?.(notification)}
                            >
                              <div className={styles.notificationIcon}>
                                {notification.icon || '📢'}
                              </div>
                              <div className={styles.notificationContent}>
                                <p className={styles.notificationTitle}>
                                  {notification.title}
                                </p>
                                <p className={styles.notificationMessage}>
                                  {notification.message}
                                </p>
                                <span className={styles.notificationTime}>
                                  {notification.time}
                                </span>
                              </div>
                              {!notification.read && (
                                <div className={styles.unreadIndicator} />
                              )}
                            </div>
                          ))
                        )}
                      </div>
                      {notifications.length > 5 && (
                        <div className={styles.dropdownFooter}>
                          <button className={styles.viewAllButton}>
                            View all notifications
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Profile */}
              {showProfile && user && (
                <div className={styles.dropdown} ref={profileRef}>
                  <button
                    className={`${styles.profileButton} ${profileOpen ? styles.profileButtonActive : ''}`}
                    onClick={() => setProfileOpen(!profileOpen)}
                    aria-label="Profile menu"
                  >
                    <div className={styles.profileAvatar}>
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <span>{user.name?.charAt(0) || '👤'}</span>
                      )}
                    </div>
                    <div className={styles.profileInfo}>
                      <span className={styles.profileName}>{user.name}</span>
                      <span className={styles.profileRole}>{user.role}</span>
                    </div>
                    <div className={`${styles.profileChevron} ${profileOpen ? styles.profileChevronUp : ''}`}>
                      ▼
                    </div>
                  </button>

                  {profileOpen && (
                    <div className={styles.dropdownPanel}>
                      <div className={styles.profileDropdownHeader}>
                        <div className={styles.profileDropdownAvatar}>
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} />
                          ) : (
                            <span>{user.name?.charAt(0) || '👤'}</span>
                          )}
                        </div>
                        <div className={styles.profileDropdownInfo}>
                          <p className={styles.profileDropdownName}>{user.name}</p>
                          <p className={styles.profileDropdownEmail}>{user.email}</p>
                        </div>
                      </div>
                      <div className={styles.profileMenu}>
                        <a href="#" className={styles.profileMenuItem} onClick={() => onProfileClick?.('profile')}>
                          <span className={styles.profileMenuIcon}>👤</span>
                          Profile
                        </a>
                        <a href="#" className={styles.profileMenuItem} onClick={() => onProfileClick?.('settings')}>
                          <span className={styles.profileMenuIcon}>⚙️</span>
                          Settings
                        </a>
                        <a href="#" className={styles.profileMenuItem} onClick={() => onProfileClick?.('billing')}>
                          <span className={styles.profileMenuIcon}>💳</span>
                          Billing
                        </a>
                        <div className={styles.profileMenuDivider} />
                        <a href="#" className={styles.profileMenuItem} onClick={() => onProfileClick?.('help')}>
                          <span className={styles.profileMenuIcon}>❓</span>
                          Help & Support
                        </a>
                        <a href="#" className={styles.profileMenuItem} onClick={() => onProfileClick?.('logout')}>
                          <span className={styles.profileMenuIcon}>🚪</span>
                          Sign out
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && navigation.length > 0 && (
          <div className={styles.mobileNavigation}>
            {navigation.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`${styles.mobileNavItem} ${item.active ? styles.mobileNavItemActive : ''}`}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick(item);
                  }
                  setMobileMenuOpen(false);
                }}
              >
                {item.icon && <span className={styles.mobileNavIcon}>{item.icon}</span>}
                {item.label}
                {item.badge && <span className={styles.mobileNavBadge}>{item.badge}</span>}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;