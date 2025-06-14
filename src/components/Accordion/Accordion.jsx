import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Accordion.css';

const AccordionItem = ({
  id,
  title,
  subtitle,
  children,
  isOpen,
  onToggle,
  disabled = false,
  icon,
  variant = 'default',
  size = 'medium',
  customToggle
}) => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children, isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      onToggle(id);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className={`accordion-item accordion-item--${variant} accordion-item--${size} ${disabled ? 'accordion-item--disabled' : ''}`}>
      <div
        className={`accordion-header ${isOpen ? 'accordion-header--open' : ''}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        aria-disabled={disabled}
      >
        <div className="accordion-header-content">
          {icon && <span className="accordion-icon">{icon}</span>}
          <div className="accordion-text">
            <div className="accordion-title">{title}</div>
            {subtitle && <div className="accordion-subtitle">{subtitle}</div>}
          </div>
        </div>
        
        <div className="accordion-toggle">
          {customToggle || (
            <svg 
              className={`accordion-arrow ${isOpen ? 'accordion-arrow--open' : ''}`}
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none"
            >
              <path 
                d="M4 6L8 10L12 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
      
      <div
        id={`accordion-content-${id}`}
        className={`accordion-content ${isOpen ? 'accordion-content--open' : ''}`}
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : '0px'
        }}
        role="region"
        aria-labelledby={`accordion-header-${id}`}
      >
        <div ref={contentRef} className="accordion-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

const Accordion = ({
  children,
  variant = 'default',
  size = 'medium',
  allowMultiple = false,
  defaultOpenItems = [],
  collapsible = true,
  className = '',
  onChange
}) => {
  const [openItems, setOpenItems] = useState(new Set(defaultOpenItems));

  const handleToggle = (itemId) => {
    setOpenItems(prev => {
      const newOpenItems = new Set(prev);
      
      if (allowMultiple) {
        // Multiple items can be open
        if (newOpenItems.has(itemId)) {
          if (collapsible) {
            newOpenItems.delete(itemId);
          }
        } else {
          newOpenItems.add(itemId);
        }
      } else {
        // Only one item can be open
        if (newOpenItems.has(itemId)) {
          if (collapsible) {
            newOpenItems.clear();
          }
        } else {
          newOpenItems.clear();
          newOpenItems.add(itemId);
        }
      }
      
      onChange?.(Array.from(newOpenItems));
      return newOpenItems;
    });
  };

  const accordionItems = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && child.type === AccordionItem) {
      return React.cloneElement(child, {
        key: child.props.id || index,
        id: child.props.id || index,
        isOpen: openItems.has(child.props.id || index),
        onToggle: handleToggle,
        variant: child.props.variant || variant,
        size: child.props.size || size
      });
    }
    return child;
  });

  return (
    <div className={`accordion accordion--${variant} accordion--${size} ${className}`}>
      {accordionItems}
    </div>
  );
};

// PropTypes
AccordionItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'bordered', 'shadow', 'split', 'minimal', 'card']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  customToggle: PropTypes.node
};

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'bordered', 'shadow', 'split', 'minimal', 'card']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  allowMultiple: PropTypes.bool,
  defaultOpenItems: PropTypes.array,
  collapsible: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func
};

// Export both components
Accordion.Item = AccordionItem;
export { AccordionItem };
export default Accordion;