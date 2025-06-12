import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Badge.module.css';

const Badge = forwardRef(({
  children,
  variant = 'solid',
  color = 'primary',
  size = 'medium',
  interactive = false,
  removable = false,
  onRemove,
  onClick,
  leftIcon,
  rightIcon,
  dot = false,
  className = '',
  as: Component = 'span',
  ...props
}, ref) => {
  const badgeClasses = [
    styles.badge,
    styles[size],
    styles[variant],
    styles[color],
    interactive && styles.interactive,
    removable && styles.removable,
    dot && styles.withDot,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (event) => {
    if (interactive && onClick) {
      onClick(event);
    }
  };

  const handleRemove = (event) => {
    event.stopPropagation();
    onRemove?.(event);
  };

  const handleKeyDown = (event) => {
    if (interactive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick?.(event);
    }
  };

  // Close icon for removable badges
  const CloseIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  const badgeProps = {
    ref,
    className: badgeClasses,
    onClick: interactive ? handleClick : undefined,
    onKeyDown: interactive ? handleKeyDown : undefined,
    tabIndex: interactive ? 0 : undefined,
    role: interactive ? 'button' : undefined,
    'aria-label': interactive && typeof children === 'string' ? `${children} badge` : undefined,
    ...props
  };

  return (
    <Component {...badgeProps}>
      {leftIcon && (
        <span className={styles.icon} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      
      {children}
      
      {rightIcon && !removable && (
        <span className={styles.icon} aria-hidden="true">
          {rightIcon}
        </span>
      )}
      
      {removable && (
        <button
          type="button"
          className={styles.removeButton}
          onClick={handleRemove}
          aria-label="Remove badge"
          tabIndex={-1}
        >
          <CloseIcon />
        </button>
      )}
      
      {dot && <span className={styles.dot} aria-hidden="true" />}
    </Component>
  );
});

Badge.displayName = 'Badge';

Badge.propTypes = {
  /** Badge content */
  children: PropTypes.node.isRequired,
  
  /** Visual style variant */
  variant: PropTypes.oneOf(['solid', 'outline', 'soft']),
  
  /** Color theme */
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'info']),
  
  /** Size of the badge */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  
  /** Whether the badge is interactive (clickable) */
  interactive: PropTypes.bool,
  
  /** Whether the badge can be removed */
  removable: PropTypes.bool,
  
  /** Function called when badge is removed */
  onRemove: PropTypes.func,
  
  /** Function called when badge is clicked (requires interactive=true) */
  onClick: PropTypes.func,
  
  /** Icon to display on the left */
  leftIcon: PropTypes.node,
  
  /** Icon to display on the right */
  rightIcon: PropTypes.node,
  
  /** Whether to show a dot indicator */
  dot: PropTypes.bool,
  
  /** Additional CSS classes */
  className: PropTypes.string,
  
  /** HTML element or component to render as */
  as: PropTypes.elementType,
};

export default Badge;