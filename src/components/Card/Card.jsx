import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = forwardRef(({
  children,
  variant = 'elevated',
  padding = 'medium',
  interactive = false,
  loading = false,
  error = false,
  disabled = false,
  onClick,
  className = '',
  as = 'div',
  ...props
}, ref) => {
  const Component = interactive && onClick ? 'button' : as;
  
  const cardClasses = [
    styles.card,
    styles[variant],
    padding !== 'none' && styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    interactive && styles.interactive,
    loading && styles.loading,
    error && styles.error,
    disabled && styles.disabled,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (event) => {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const componentProps = {
    ref,
    className: cardClasses,
    onClick: onClick ? handleClick : undefined,
    disabled: (interactive && (disabled || loading)) ? true : undefined,
    'aria-busy': loading,
    'data-error': error || undefined,
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
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
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
  spacing = 'medium',
  className = '',
  ...props
}) => {
  const bodyClasses = [
    styles.body,
    spacing === 'compact' && styles.bodyCompact,
    spacing === 'spacious' && styles.bodySpacious,
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
          {/* Default footer content when no children provided */}
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
  className = '',
  ...props
}) => {
  const mediaContainerClasses = [
    styles.mediaContainer,
    position === 'top' && styles.mediaTop,
    position === 'bottom' && styles.mediaBottom,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={mediaContainerClasses}>
      <img
        src={src}
        alt={alt}
        className={styles.media}
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

// PropTypes for main Card component
Card.propTypes = {
  /** Card content */
  children: PropTypes.node,
  
  /** Visual variant of the card */
  variant: PropTypes.oneOf(['elevated', 'outlined', 'filled']),
  
  /** Internal padding */
  padding: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  
  /** Whether the card is interactive */
  interactive: PropTypes.bool,
  
  /** Loading state */
  loading: PropTypes.bool,
  
  /** Error state */
  error: PropTypes.bool,
  
  /** Disabled state */
  disabled: PropTypes.bool,
  
  /** Click handler for interactive cards */
  onClick: PropTypes.func,
  
  /** Additional CSS classes */
  className: PropTypes.string,
  
  /** HTML element to render as */
  as: PropTypes.string,
};

// PropTypes for subcomponents
CardHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  spacing: PropTypes.oneOf(['compact', 'medium', 'spacious']),
  className: PropTypes.string,
};

CardFooter.propTypes = {
  children: PropTypes.node,
  actions: PropTypes.node,
  className: PropTypes.string,
};

CardMedia.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom']),
  overlay: PropTypes.node,
  className: PropTypes.string,
};

// Attach subcomponents to main Card component
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Media = CardMedia;

export default Card;