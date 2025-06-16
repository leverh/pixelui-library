import { forwardRef } from 'react';
import styles from './Button.module.css';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  className = '',
  rounded = false,
  elevated = false,
  ...props
}, ref) => {
  const handleClick = (event) => {
    if (loading || disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className={styles.spinner}>
      <div className={styles.spinnerRing} />
    </div>
  );

  return (
    <button
      ref={ref}
      className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
        ${loading ? styles.loading : ''}
        ${fullWidth ? styles.fullWidth : ''}
        ${rounded ? styles.rounded : ''}
        ${elevated ? styles.elevated : ''}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled || loading}
      type={type}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {/* Left Icon */}
      {leftIcon && !loading && (
        <span className={styles.leftIcon} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      
      {/* Loading Spinner */}
      {loading && <LoadingSpinner />}
      
      {/* Button Content */}
      <span className={`${styles.content} ${loading ? styles.loadingContent : ''}`}>
        {children}
      </span>
      
      {/* Right Icon */}
      {rightIcon && !loading && (
        <span className={styles.rightIcon} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;