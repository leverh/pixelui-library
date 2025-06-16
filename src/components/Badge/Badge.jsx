import { forwardRef } from 'react';
import styles from './Badge.module.css';

const Badge = forwardRef(({
  children,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  interactive = false,
  removable = false,
  onRemove,
  onClick,
  leftIcon,
  rightIcon,
  dot = false,
  pulse = false,
  className = '',
  as: Component = 'span',
  ...props
}, ref) => {
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );

  return (
    <Component
      ref={ref}
      className={`
        ${styles.badge}
        ${styles[size]}
        ${styles[variant]}
        ${styles[color]}
        ${interactive ? styles.interactive : ''}
        ${removable ? styles.removable : ''}
        ${dot ? styles.withDot : ''}
        ${pulse ? styles.pulse : ''}
        ${className}
      `}
      onClick={interactive ? handleClick : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      aria-label={interactive && typeof children === 'string' ? `${children} badge` : undefined}
      {...props}
    >
      {leftIcon && (
        <span className={styles.leftIcon} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      
      <span className={styles.content}>
        {children}
      </span>
      
      {rightIcon && !removable && (
        <span className={styles.rightIcon} aria-hidden="true">
          {rightIcon}
        </span>
      )}
      
      {removable && (
        <button
          type="button"
          className={styles.removeButton}
          onClick={handleRemove}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleRemove(e);
            }
          }}
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

export default Badge;