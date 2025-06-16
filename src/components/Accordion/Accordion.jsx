import { useState, useRef, useEffect } from 'react';
import styles from './Accordion.module.css';

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
  size = 'md',
  customToggle,
  badge
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
    <div className={`
      ${styles.accordionItem}
      ${styles[variant]}
      ${styles[size]}
      ${disabled ? styles.disabled : ''}
      ${isOpen ? styles.open : ''}
    `}>
      <div
        className={`${styles.accordionHeader} ${isOpen ? styles.headerOpen : ''}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        aria-disabled={disabled}
      >
        <div className={styles.headerContent}>
          {icon && (
            <div className={styles.iconContainer}>
              <span className={styles.icon}>{icon}</span>
            </div>
          )}
          
          <div className={styles.textContent}>
            <div className={styles.title}>{title}</div>
            {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
          </div>
        </div>
        
        <div className={styles.headerActions}>
          {badge && (
            <span className={styles.badge}>{badge}</span>
          )}
          
          <div className={styles.toggleContainer}>
            {customToggle || (
              <div className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
                ▼
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div
        id={`accordion-content-${id}`}
        className={`${styles.accordionContent} ${isOpen ? styles.contentOpen : ''}`}
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : '0px'
        }}
        role="region"
        aria-labelledby={`accordion-header-${id}`}
      >
        <div ref={contentRef} className={styles.contentInner}>
          {children}
        </div>
      </div>
    </div>
  );
};

const Accordion = ({
  children,
  variant = 'default',
  size = 'md',
  allowMultiple = false,
  defaultOpenItems = [],
  collapsible = true,
  className = '',
  onChange,
  animated = true
}) => {
  const [openItems, setOpenItems] = useState(new Set(defaultOpenItems));

  const handleToggle = (itemId) => {
    setOpenItems(prev => {
      const newOpenItems = new Set(prev);
      
      if (allowMultiple) {
        if (newOpenItems.has(itemId)) {
          if (collapsible) {
            newOpenItems.delete(itemId);
          }
        } else {
          newOpenItems.add(itemId);
        }
      } else {
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

  const accordionItems = children?.map((child, index) => {
    if (child?.type === AccordionItem) {
      return {
        ...child,
        key: child.props.id || index,
        props: {
          ...child.props,
          id: child.props.id || index,
          isOpen: openItems.has(child.props.id || index),
          onToggle: handleToggle,
          variant: child.props.variant || variant,
          size: child.props.size || size
        }
      };
    }
    return child;
  });

  return (
    <div className={`
      ${styles.accordion}
      ${styles[variant]}
      ${styles[size]}
      ${animated ? styles.animated : styles.noAnimation}
      ${className}
    `}>
      {accordionItems}
    </div>
  );
};

Accordion.Item = AccordionItem;
export { AccordionItem };
export default Accordion;