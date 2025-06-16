import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = forwardRef(({
  children,
  variant = 'elevated',
  size = 'md',
  interactive = false,
  loading = false,
  error = false,
  success = false,
  disabled = false,
  floating = false,
  onClick,
  className = '',
  as = 'div',
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const Component = interactive && onClick ? 'button' : as;
  
  const cardClasses = [
    styles.card,
    styles[variant],
    size !== 'none' && styles[`padding${size.charAt(0).toUpperCase() + size.slice(1)}`],
    interactive && styles.interactive,
    loading && styles.loading,
    error && styles.error,
    success && styles.success,
    disabled && styles.disabled,
    floating && styles.floating,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (event) => {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const handleKeyDown = (event) => {
    if (interactive && onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleClick(event);
    }
  };

  const componentProps = {
    ref,
    className: cardClasses,
    onClick: onClick ? handleClick : undefined,
    onKeyDown: interactive ? handleKeyDown : undefined,
    disabled: (interactive && (disabled || loading)) ? true : undefined,
    'aria-busy': loading,
    'aria-label': ariaLabel || (interactive ? 'Interactive card' : undefined),
    'data-error': error || undefined,
    'data-success': success || undefined,
    'data-testid': 'card',
    role: interactive ? 'button' : undefined,
    tabIndex: interactive && !disabled && !loading ? 0 : undefined,
    ...props
  };

  return (
    <Component {...componentProps}>
      {children}
    </Component>
  );
});

Card.displayName = 'Card';

// Card Header subcomponent
const CardHeader = ({
  title,
  subtitle,
  actions,
  avatar,
  badge,
  children,
  className = '',
  ...props
}) => {
  const headerClasses = [styles.header, className].filter(Boolean).join(' ');

  return (
    <div className={headerClasses} {...props}>
      {children || (
        <>
          <div className={styles.headerContent}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              {avatar && (
                <div className={styles.headerAvatar}>
                  {avatar}
                </div>
              )}
              <div>
                {title && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <h3 className={styles.title}>{title}</h3>
                    {badge && <div className={styles.headerBadge}>{badge}</div>}
                  </div>
                )}
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
              </div>
            </div>
          </div>
          {actions && (
            <div className={styles.headerActions}>
              {actions}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Card Body subcomponent
const CardBody = ({
  children,
  spacing = 'md',
  scrollable = false,
  className = '',
  ...props
}) => {
  const bodyClasses = [
    styles.body,
    spacing === 'xs' && styles.bodyCompact,
    spacing === 'sm' && styles.bodyCompact,
    spacing === 'lg' && styles.bodySpacious,
    spacing === 'xl' && styles.bodySpacious,
    scrollable && styles.bodyScrollable,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={bodyClasses} {...props}>
      {children}
    </div>
  );
};

// Card Footer subcomponent
const CardFooter = ({
  children,
  actions,
  timestamp,
  className = '',
  ...props
}) => {
  const footerClasses = [styles.footer, className].filter(Boolean).join(' ');

  return (
    <div className={footerClasses} {...props}>
      {children ? (
        children
      ) : (
        <div className={styles.footerContent}>
          {timestamp && (
            <span style={{ 
              fontSize: 'var(--text-sm)', 
              color: 'var(--color-text-secondary)',
              opacity: 0.8
            }}>
              {timestamp}
            </span>
          )}
        </div>
      )}
      {actions && (
        <div className={styles.footerActions}>
          {actions}
        </div>
      )}
    </div>
  );
};

// Card Media subcomponent
const CardMedia = ({
  src,
  alt,
  position = 'top',
  overlay,
  aspectRatio = 'auto',
  lazy = true,
  className = '',
  ...props
}) => {
  const mediaContainerClasses = [
    styles.mediaContainer,
    position === 'top' && styles.mediaTop,
    position === 'bottom' && styles.mediaBottom,
    className
  ].filter(Boolean).join(' ');

  const mediaStyle = {
    aspectRatio: aspectRatio !== 'auto' ? aspectRatio : undefined,
  };

  return (
    <div className={mediaContainerClasses}>
      <img
        src={src}
        alt={alt}
        className={styles.media}
        style={mediaStyle}
        loading={lazy ? 'lazy' : 'eager'}
        {...props}
      />
      {overlay && (
        <div className={styles.mediaOverlay}>
          <div className={styles.mediaOverlayContent}>
            {overlay}
          </div>
        </div>
      )}
    </div>
  );
};

// Card Divider subcomponent
const CardDivider = ({ className = '', ...props }) => {
  return (
    <hr 
      className={`${styles.divider} ${className}`}
      {...props}
    />
  );
};

// Card Section subcomponent
const CardSection = ({
  children,
  spacing = 'md',
  className = '',
  ...props
}) => {
  const sectionClasses = [
    styles.section,
    spacing === 'xs' && styles.sectionCompact,
    spacing === 'sm' && styles.sectionCompact,
    spacing === 'lg' && styles.sectionSpacious,
    spacing === 'xl' && styles.sectionSpacious,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={sectionClasses} {...props}>
      {children}
    </div>
  );
};

// PropTypes for main Card component
Card.propTypes = {
  /** Card content */
  children: PropTypes.node,
  
  /** Visual variant of the card */
  variant: PropTypes.oneOf(['elevated', 'outlined', 'filled']),
  
  /** Size/padding of the card */
  size: PropTypes.oneOf(['none', 'xs', 'sm', 'md', 'lg', 'xl']),
  
  /** Whether the card is interactive */
  interactive: PropTypes.bool,
  
  /** Loading state */
  loading: PropTypes.bool,
  
  /** Error state */
  error: PropTypes.bool,
  
  /** Success state */
  success: PropTypes.bool,
  
  /** Disabled state */
  disabled: PropTypes.bool,
  
  /** Floating animation */
  floating: PropTypes.bool,
  
  /** Click handler for interactive cards */
  onClick: PropTypes.func,
  
  /** Additional CSS classes */
  className: PropTypes.string,
  
  /** HTML element to render as */
  as: PropTypes.string,
  
  /** Accessible label for screen readers */
  'aria-label': PropTypes.string,
};

// PropTypes for subcomponents
CardHeader.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  actions: PropTypes.node,
  avatar: PropTypes.node,
  badge: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  spacing: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  scrollable: PropTypes.bool,
  className: PropTypes.string,
};

CardFooter.propTypes = {
  children: PropTypes.node,
  actions: PropTypes.node,
  timestamp: PropTypes.string,
  className: PropTypes.string,
};

CardMedia.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom']),
  overlay: PropTypes.node,
  aspectRatio: PropTypes.string,
  lazy: PropTypes.bool,
  className: PropTypes.string,
};

CardDivider.propTypes = {
  className: PropTypes.string,
};

CardSection.propTypes = {
  children: PropTypes.node.isRequired,
  spacing: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

// Attach subcomponents to main Card component
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Media = CardMedia;
Card.Divider = CardDivider;
Card.Section = CardSection;

export default Card;