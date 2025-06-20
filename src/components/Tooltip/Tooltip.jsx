import { useState, useEffect, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Tooltip.module.css';

const Tooltip = forwardRef(({
  children,
  content,
  position = 'top',
  color = 'dark',
  size = 'md',
  delay = 'md',
  trigger = 'hover',
  showArrow = true,
  interactive = false,
  disabled = false,
  multiline = false,
  animation = 'scale',
  className = '',
  onShow,
  onHide,
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(position);
  const [shouldShow, setShouldShow] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  // Auto-positioning with collision detection
  const calculatePosition = () => {
    if (!wrapperRef.current || !tooltipRef.current) return position;

    const wrapper = wrapperRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Calculate available space in each direction with padding
    const padding = 16;
    const spaceTop = wrapper.top - padding;
    const spaceBottom = viewport.height - wrapper.bottom - padding;
    const spaceLeft = wrapper.left - padding;
    const spaceRight = viewport.width - wrapper.right - padding;

    // Minimum space required (tooltip size + arrow + margin)
    const minSpace = Math.max(tooltip.height, tooltip.width) + 20;

    // Smart auto-positioning based on available space and preferred order
    if (position === 'auto') {
      const positions = [
        { pos: 'top', space: spaceTop },
        { pos: 'bottom', space: spaceBottom },
        { pos: 'right', space: spaceRight },
        { pos: 'left', space: spaceLeft }
      ];
      
      // Sort by available space (descending)
      positions.sort((a, b) => b.space - a.space);
      
      // Return first position with enough space
      for (const { pos, space } of positions) {
        if (space >= minSpace) return pos;
      }
      
      return positions[0].pos; // fallback to position with most space
    }

    // Collision detection for fixed positions
    const positionMap = {
      top: spaceTop >= minSpace ? 'top' : spaceBottom >= minSpace ? 'bottom' : 'top',
      bottom: spaceBottom >= minSpace ? 'bottom' : spaceTop >= minSpace ? 'top' : 'bottom',
      left: spaceLeft >= minSpace ? 'left' : spaceRight >= minSpace ? 'right' : 'left',
      right: spaceRight >= minSpace ? 'right' : spaceLeft >= minSpace ? 'left' : 'right'
    };

    return positionMap[position] || position;
  };

  const showTooltip = () => {
    if (disabled || !content) return;

    clearTimeout(hideTimeoutRef.current);
    setIsAnimating(true);
    
    const delayMs = {
      none: 0,
      xs: 50,
      sm: 150,
      md: 300,
      lg: 500,
      xl: 750
    }[delay] || 300;

    timeoutRef.current = setTimeout(() => {
      setShouldShow(true);
      
      // Calculate position after tooltip is rendered
      setTimeout(() => {
        const newPosition = calculatePosition();
        setCurrentPosition(newPosition);
        setIsVisible(true);
        setIsAnimating(false);
        onShow?.();
      }, 10);
    }, delayMs);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setIsAnimating(true);
    
    if (interactive) {
      // Delay hiding for interactive tooltips
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setShouldShow(false);
          setIsAnimating(false);
        }, 200);
        onHide?.();
      }, 100);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        setShouldShow(false);
        setIsAnimating(false);
      }, 200);
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

  // Keyboard support
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (trigger === 'focus' || trigger === 'both') {
        event.preventDefault();
        if (isVisible) {
          hideTooltip();
        } else {
          showTooltip();
        }
      }
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Escape key handling
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isVisible) {
        hideTooltip();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isVisible]);

  // Click outside handling
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

  // Responsive positioning on resize
  useEffect(() => {
    const handleResize = () => {
      if (isVisible && (position === 'auto' || shouldShow)) {
        const newPosition = calculatePosition();
        setCurrentPosition(newPosition);
      }
    };

    if (isVisible) {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isVisible, position, shouldShow]);

  if (!content) {
    return children;
  }

  const tooltipClasses = [
    styles.tooltip,
    styles[`position${currentPosition.charAt(0).toUpperCase() + currentPosition.slice(1)}`],
    styles[`color${color.charAt(0).toUpperCase() + color.slice(1)}`],
    styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
    styles[`animation${animation.charAt(0).toUpperCase() + animation.slice(1)}`],
    isVisible && styles.visible,
    isAnimating && styles.animating,
    interactive && styles.interactive,
    multiline && styles.multiline,
    showArrow && styles.withArrow,
    className
  ].filter(Boolean).join(' ');

  const wrapperClasses = [
    styles.tooltipWrapper,
    disabled && styles.disabled
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
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
      
      {shouldShow && (
        <div
          ref={tooltipRef}
          className={tooltipClasses}
          role="tooltip"
          aria-hidden={!isVisible}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        >
          <div className={styles.tooltipContent}>
            {typeof content === 'string' ? (
              <span>{content}</span>
            ) : (
              content
            )}
          </div>
          
          {showArrow && (
            <div 
              className={`${styles.arrow} ${styles[`arrow${currentPosition.charAt(0).toUpperCase() + currentPosition.slice(1)}`]}`} 
            />
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
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  
  /** Delay before showing tooltip */
  delay: PropTypes.oneOf(['none', 'xs', 'sm', 'md', 'lg', 'xl']),
  
  /** What triggers the tooltip */
  trigger: PropTypes.oneOf(['hover', 'focus', 'click', 'both']),
  
  /** Animation type */
  animation: PropTypes.oneOf(['scale', 'fade', 'slide', 'bounce']),
  
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