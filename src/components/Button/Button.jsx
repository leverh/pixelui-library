import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  className = '',
  ...props
}, ref) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    loading && styles.loading,
    fullWidth && styles.fullWidth,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (event) => {
    if (loading || disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      ref={ref}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      type={type}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {leftIcon && !loading && (
        <span className={styles.icon} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      
      <span className={loading ? styles.hiddenText : undefined}>
        {children}
      </span>
      
      {rightIcon && !loading && (
        <span className={styles.icon} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  /** Button content */
  children: PropTypes.node.isRequired,
  
  /** Visual style variant */
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'destructive']),
  
  /** Size of the button */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  
  /** Whether the button is in loading state */
  loading: PropTypes.bool,
  
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  
  /** Whether the button should take full width */
  fullWidth: PropTypes.bool,
  
  /** Icon to display on the left side */
  leftIcon: PropTypes.node,
  
  /** Icon to display on the right side */
  rightIcon: PropTypes.node,
  
  /** Click handler */
  onClick: PropTypes.func,
  
  /** Button type */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Button;