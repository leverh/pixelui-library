import { useState, useEffect, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Tooltip.module.css';

const Tooltip = forwardRef(({
  children,
  content,
  position = 'top',
  color = 'dark',
  size = 'medium',
  delay = 'medium',
  trigger = 'hover',
  showArrow = true,
  interactive = false,
  disabled = false,
  multiline = false,
  className = '',
  onShow,
  onHide,
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(position);
  const [shouldShow, setShouldShow] = useState(false);
  
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  // Auto-positioning logic
  const calculatePosition = () => {
    if (!wrapperRef.current || !tooltipRef.current) return position;

    const wrapper = wrapperRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Calculate available space in each direction
    const spaceTop = wrapper.top;
    const spaceBottom = viewport.height - wrapper.bottom;
    const spaceLeft = wrapper.left;
    const spaceRight = viewport.width - wrapper.right;

    // Minimum space required (tooltip height/width + arrow + margin)
    const minSpace = 80;

    // Auto-position based on available space
    if (position === 'auto') {
      if (spaceTop >= minSpace) return 'top';
      if (spaceBottom >= minSpace) return 'bottom';
      if (spaceRight >= minSpace) return 'right';
      if (spaceLeft >= minSpace) return 'left';
      return 'top'; // fallback
    }

    // Check if current position has enough space, otherwise flip
    switch (position) {
      case 'top':
        return spaceTop >= minSpace ? 'top' : 'bottom';
      case 'bottom':
        return spaceBottom >= minSpace ? 'bottom' : 'top';
      case 'left':
        return spaceLeft >= minSpace ? 'left' : 'right';
      case 'right':
        return spaceRight >= minSpace ? 'right' : 'left';
      default:
        return position;
    }
  };

  const showTooltip = () => {
    if (disabled || !content) return;

    clearTimeout(hideTimeoutRef.current);
    
    const delayMs = {
      none: 0,
      short: 100,
      medium: 300,
      long: 500
    }[delay] || 300;

    timeoutRef.current = setTimeout(() => {
      setShouldShow(true);
      // Calculate position after tooltip is rendered
      setTimeout(() => {
        if (position === 'auto' || position === 'top' || position === 'bottom') {
          const newPosition = calculatePosition();
          setCurrentPosition(newPosition);
        }
        setIsVisible(true);
        onShow?.();
      }, 10);
    }, delayMs);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    
    if (interactive) {
      // Delay hiding for interactive tooltips
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setShouldShow(false), 150);
        onHide?.();
      }, 100);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldShow(false), 150);
      onHide?.();
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover' || trigger === 'both') {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover' || trigger === 'both') {
      hideTooltip();
    }
  };

  const handleFocus = () => {
    if (trigger === 'focus' || trigger === 'both') {
      showTooltip();
    }
  };

  const handleBlur = () => {
    if (trigger === 'focus' || trigger === 'both') {
      hideTooltip();
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  const handleTooltipMouseEnter = () => {
    if (interactive) {
      clearTimeout(hideTimeoutRef.current);
    }
  };

  const handleTooltipMouseLeave = () => {
    if (interactive) {
      hideTooltip();
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Handle escape key for click tooltips
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isVisible && trigger === 'click') {
        hideTooltip();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isVisible, trigger]);

  // Handle click outside for click tooltips
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        trigger === 'click' && 
        isVisible && 
        wrapperRef.current && 
        !wrapperRef.current.contains(event.target) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target)
      ) {
        hideTooltip();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible, trigger]);

  if (!content) {
    return children;
  }

  const tooltipClasses = [
    styles.tooltip,
    styles[currentPosition],
    styles[color],
    styles[size],
    styles[`delay${delay.charAt(0).toUpperCase() + delay.slice(1)}`],
    isVisible && styles.visible,
    interactive && styles.interactive,
    multiline && styles.multiline,
    className
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    styles.tooltipWrapper
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={(node) => {
        wrapperRef.current = node;
        if (ref) {
          if (typeof ref === 'function') {
            ref(node);
          } else {
            ref.current = node;
          }
        }
      }}
      className={wrapperClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      {...props}
    >
      {children}
      
      {shouldShow && (
        <div
          ref={tooltipRef}
          className={tooltipClasses}
          role="tooltip"
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        >
          {typeof content === 'string' ? (
            <span>{content}</span>
          ) : (
            content
          )}
          
          {showArrow && (
            <div className={`${styles.arrow} ${styles[currentPosition]}`} />
          )}
        </div>
      )}
    </div>
  );
});

Tooltip.displayName = 'Tooltip';

Tooltip.propTypes = {
  /** Element that triggers the tooltip */
  children: PropTypes.node.isRequired,
  
  /** Tooltip content (string or React element) */
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  
  /** Position of the tooltip */
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'auto']),
  
  /** Color theme of the tooltip */
  color: PropTypes.oneOf(['dark', 'light', 'primary', 'success', 'warning', 'error']),
  
  /** Size of the tooltip */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  
  /** Delay before showing tooltip */
  delay: PropTypes.oneOf(['none', 'short', 'medium', 'long']),
  
  /** What triggers the tooltip */
  trigger: PropTypes.oneOf(['hover', 'focus', 'click', 'both']),
  
  /** Whether to show arrow */
  showArrow: PropTypes.bool,
  
  /** Whether tooltip content is interactive */
  interactive: PropTypes.bool,
  
  /** Whether tooltip is disabled */
  disabled: PropTypes.bool,
  
  /** Whether content can span multiple lines */
  multiline: PropTypes.bool,
  
  /** Additional CSS classes */
  className: PropTypes.string,
  
  /** Callback when tooltip is shown */
  onShow: PropTypes.func,
  
  /** Callback when tooltip is hidden */
  onHide: PropTypes.func,
};

export default Tooltip;